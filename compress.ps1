$Dir = "src/images/figure_drawing"

Get-ChildItem $Dir -File | ForEach-Object {
    $path = $_.FullName

    # Resize to max 2000px and compress to quality 75
    magick $path -resize "2000x2000>" -quality 75 $path

    Write-Host "Compressed $($_.Name)"
}

Write-Host "All images compressed in place."
