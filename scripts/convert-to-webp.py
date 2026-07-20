#!/usr/bin/env python3
import os
import sys
import subprocess

def install_and_import(package):
    try:
        __import__(package)
    except ImportError:
        print(f"Installing {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

# Make sure Pillow is installed
install_and_import("PIL")

from PIL import Image

def convert_to_webp(source_path, quality=90):
    if not os.path.exists(source_path):
        print(f"Error: Path '{source_path}' does not exist.")
        return

    # Check if it's a directory or a file
    if os.path.isdir(source_path):
        for root, _, files in os.walk(source_path):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                    file_path = os.path.join(root, file)
                    do_conversion(file_path, quality)
    else:
        if source_path.lower().endswith(('.png', '.jpg', '.jpeg')):
            do_conversion(source_path, quality)
        else:
            print("Error: Target file must be a PNG, JPG, or JPEG image.")

def format_size(bytes):
    if bytes < 1024:
        return f"{bytes} B"
    elif bytes < 1024 * 1024:
        return f"{bytes / 1024:.1f} KB"
    else:
        return f"{bytes / (1024 * 1024):.2f} MB"

def do_conversion(image_path, quality):
    try:
        original_size = os.path.getsize(image_path)
        img = Image.open(image_path)
        dest_path = os.path.splitext(image_path)[0] + ".webp"
        img.save(dest_path, "WEBP", quality=quality)
        webp_size = os.path.getsize(dest_path)
        reduction = (1 - webp_size / original_size) * 100
        print(f"Converted: {image_path} -> {dest_path}")
        print(f"  Size: {format_size(original_size)} -> {format_size(webp_size)} ({reduction:+.1f}%)")
    except Exception as e:
        print(f"Failed to convert {image_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 convert-to-webp.py <path_to_image_or_directory> [quality_0_to_100]")
        sys.exit(1)
        
    path = sys.argv[1]
    quality = 90
    if len(sys.argv) > 2:
        try:
            quality = int(sys.argv[2])
        except ValueError:
            print("Warning: Quality must be an integer between 0 and 100. Using default (90).")
            
    convert_to_webp(path, quality)
