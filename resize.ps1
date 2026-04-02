$Dir = "src/images/journal/2026_04_02"

Get-ChildItem $Dir -File | ForEach-Object {
    $path = $_.FullName

    # Resize
    magick $path -resize 50% $path

    Write-Host "resized $($_.Name)"
}

Write-Host "All images are resized."

#resizes images by 50% to save storage space (esp for journal images which a care a little less about being 100% good)