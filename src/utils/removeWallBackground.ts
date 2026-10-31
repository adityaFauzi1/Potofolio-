/**
 * Automatically removes uniform/textured studio or concrete wall backgrounds
 * (such as light grey/beige walls) from a portrait photo by flood-filling from
 * the outer border pixels inward with feathered alpha transparency.
 */
export async function processPortraitBackground(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const maxDim = 900;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Sample border pixels along top, left, and right edges to estimate wall color
        let rSum = 0;
        let gSum = 0;
        let bSum = 0;
        let sampleCount = 0;

        const addSample = (x: number, y: number) => {
          const idx = (y * width + x) * 4;
          rSum += data[idx];
          gSum += data[idx + 1];
          bSum += data[idx + 2];
          sampleCount++;
        };

        for (let x = 0; x < width; x += 4) {
          addSample(x, 2);
          addSample(x, Math.min(height - 1, 12));
        }
        for (let y = 0; y < Math.floor(height * 0.65); y += 4) {
          addSample(2, y);
          addSample(width - 3, y);
        }

        const bgR = rSum / sampleCount;
        const bgG = gSum / sampleCount;
        const bgB = bSum / sampleCount;

        // Helper for color distance from the sampled wall background
        // Protects warm beige/gold/brown batik fabric and skin tones from being mistaken for wall
        const colorDist = (r: number, g: number, b: number) => {
          const dr = r - bgR;
          const dg = g - bgG;
          const db = b - bgB;
          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);
          const sat = maxC - minC;
          const warmth = r - b; // Batik cream/gold & skin have higher red-vs-blue warmth than grey wall
          const euclid = Math.sqrt(dr * dr + dg * dg + db * db);
          if (sat > 22 || warmth > 18) {
            return euclid * 2.1;
          }
          return euclid;
        };

        const visited = new Uint8Array(width * height);
        const isBg = new Uint8Array(width * height);
        const queue = new Int32Array(width * height);
        let head = 0;
        let tail = 0;

        // Conservative threshold so shoulders, arms, and batik patterns are never eaten
        const thresholdHard = 28;

        const enqueueIfBg = (x: number, y: number) => {
          if (x < 0 || x >= width || y < 0 || y >= height) return;
          // Protect central torso/shoulders zone below head level
          if (y > height * 0.34 && x > width * 0.16 && x < width * 0.84) return;
          const pos = y * width + x;
          if (visited[pos]) return;
          visited[pos] = 1;

          const idx = pos * 4;
          const dist = colorDist(data[idx], data[idx + 1], data[idx + 2]);
          if (dist <= thresholdHard) {
            isBg[pos] = 1;
            queue[tail++] = pos;
          }
        };

        // Seed flood-fill from top, left, and right borders
        for (let x = 0; x < width; x++) {
          enqueueIfBg(x, 0);
          enqueueIfBg(x, 1);
        }
        for (let y = 0; y < height; y++) {
          enqueueIfBg(0, y);
          enqueueIfBg(width - 1, y);
        }

        // BFS flood-fill from exterior wall inward
        while (head < tail) {
          const pos = queue[head++];
          const x = pos % width;
          const y = (pos - x) / width;

          enqueueIfBg(x + 1, y);
          enqueueIfBg(x - 1, y);
          enqueueIfBg(x, y + 1);
          enqueueIfBg(x, y - 1);
        }

        // Apply transparency to flood-filled wall pixels + feather 2px boundary
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const pos = y * width + x;
            const idx = pos * 4;
            if (isBg[pos]) {
              data[idx + 3] = 0;
            } else {
              // Check if adjacent to background for soft edge feathering
              let bgNeighbors = 0;
              if (x > 0 && isBg[pos - 1]) bgNeighbors++;
              if (x < width - 1 && isBg[pos + 1]) bgNeighbors++;
              if (y > 0 && isBg[pos - width]) bgNeighbors++;
              if (y < height - 1 && isBg[pos + width]) bgNeighbors++;

              if (bgNeighbors > 0) {
                const dist = colorDist(data[idx], data[idx + 1], data[idx + 2]);
                const alphaFactor = Math.min(1, Math.max(0.15, (dist - 18) / 45));
                data[idx + 3] = Math.round(255 * alphaFactor);
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
