# Define the paths to the component files and the directory containing HTML files
$headerFile = "Z:\3maqi_site\src\components\header.html"
$sidebarFile = "Z:\3maqi_site\src\components\sidebar.html"
$footerFile = "Z:\3maqi_site\src\components\footer.html"
$htmlDirectory = "Z:\3maqi_site\src"

# Check if all component files exist
if (-Not (Test-Path $headerFile)) {
    Write-Host "Header file not found: $headerFile" -ForegroundColor Red
    exit
}
if (-Not (Test-Path $sidebarFile)) {
    Write-Host "Sidebar file not found: $sidebarFile" -ForegroundColor Red
    exit
}
if (-Not (Test-Path $footerFile)) {
    Write-Host "Footer file not found: $footerFile" -ForegroundColor Red
    exit
}

# Read the content of the component files
$headerContent = Get-Content $headerFile -Raw
$sidebarContent = Get-Content $sidebarFile -Raw
$footerContent = Get-Content $footerFile -Raw

# Define the start and end markers for each component in the HTML files
$headerStartMarker = '<div id="header-container">'
$headerEndMarker = '</div><!--header end-->'
$sidebarStartMarker = '<div id="sidebar-container">'
$sidebarEndMarker = '</div><!-- side bar end -->'
$footerStartMarker = '<div id="footer-container">'
$footerEndMarker = '</div><!--footer container end-->'

# Get all HTML files in the directory
$htmlFiles = Get-ChildItem -Path $htmlDirectory -Filter *.html

# Loop through each HTML file and replace the content for each component
foreach ($file in $htmlFiles) {
    Write-Host "Processing file: $($file.FullName)" -ForegroundColor Yellow

    # Read the file content
    $fileContent = Get-Content $file.FullName -Raw

    # Replace the header content
    if ($fileContent -match [regex]::Escape($headerStartMarker) -and $fileContent -match [regex]::Escape($headerEndMarker)) {
        $fileContent = $fileContent -replace "(?s)$([regex]::Escape($headerStartMarker)).*?$([regex]::Escape($headerEndMarker))", "$headerStartMarker`n$headerContent`n$headerEndMarker"
        Write-Host "Updated header in: $($file.FullName)" -ForegroundColor Green
    } else {
        Write-Host "Header markers not found in: $($file.FullName)" -ForegroundColor Red
    }

    # Replace the sidebar content
    if ($fileContent -match [regex]::Escape($sidebarStartMarker) -and $fileContent -match [regex]::Escape($sidebarEndMarker)) {
        $fileContent = $fileContent -replace "(?s)$([regex]::Escape($sidebarStartMarker)).*?$([regex]::Escape($sidebarEndMarker))", "$sidebarStartMarker`n$sidebarContent`n$sidebarEndMarker"
        Write-Host "Updated sidebar in: $($file.FullName)" -ForegroundColor Green
    } else {
        Write-Host "Sidebar markers not found in: $($file.FullName)" -ForegroundColor Red
    }

    # Replace the footer content
    if ($fileContent -match [regex]::Escape($footerStartMarker) -and $fileContent -match [regex]::Escape($footerEndMarker)) {
        $fileContent = $fileContent -replace "(?s)$([regex]::Escape($footerStartMarker)).*?$([regex]::Escape($footerEndMarker))", "$footerStartMarker`n$footerContent`n$footerEndMarker"
        Write-Host "Updated footer in: $($file.FullName)" -ForegroundColor Green
    } else {
        Write-Host "Footer markers not found in: $($file.FullName)" -ForegroundColor Red
    }

    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $fileContent
    Write-Host "Saved changes to: $($file.FullName)" -ForegroundColor Cyan
}

Write-Host "Component updates completed!" -ForegroundColor Cyan