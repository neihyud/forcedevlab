import fs from "fs";
import path from "path";

const uiDir = path.resolve("src/components/ui");
const indexFile = path.join(uiDir, "index.ts");

// Bước 1: đảm bảo có file index.ts
if (!fs.existsSync(indexFile)) {
  fs.writeFileSync(indexFile, "", "utf8");
}

// Bước 2: di chuyển từng file .tsx vào folder riêng
fs.readdirSync(uiDir).forEach((file) => {
  if (file.endsWith(".tsx") && file !== "index.tsx") {
    const base = file.replace(".tsx", "");
    const folder = path.join(uiDir, base);
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    fs.renameSync(path.join(uiDir, file), path.join(folder, "index.tsx"));
  }
});

// Bước 3: quét lại thư mục ui và thêm export vào index.ts
const dirs = fs
  .readdirSync(uiDir)
  .filter((file) => fs.statSync(path.join(uiDir, file)).isDirectory());

const exportsContent =
  dirs.map((dir) => `export * from "./${dir}";`).join("\n") + "\n";

fs.writeFileSync(indexFile, exportsContent, "utf8");

console.log("✅ Shadcn UI components organized successfully!");
