Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('C:\Users\admin\Desktop\chuyen-de-ASP.NET.docx')
$docEntry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $docEntry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$zip.Dispose()
$xml = [xml]$content
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
$nodes = $xml.SelectNodes("//w:t", $ns)
foreach ($node in $nodes) { Write-Output $node.InnerText }
