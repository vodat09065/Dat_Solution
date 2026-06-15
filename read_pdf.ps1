Add-Type -AssemblyName System.IO
$pdfPath = 'C:\Users\admin\Desktop\Nội dung chốt điểm lần 3 - Google Tài liệu.pdf'
$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
$rawText = [System.Text.Encoding]::Latin1.GetString($bytes)
# Extract readable text chunks (sequences of printable ASCII chars)
$matches = [System.Text.RegularExpressions.Regex]::Matches($rawText, '[ -~\r\n]{4,}')
$text = ($matches | ForEach-Object { $_.Value }) -join "`n"
$text
