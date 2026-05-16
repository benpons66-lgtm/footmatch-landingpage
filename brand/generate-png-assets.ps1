Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$appIconDir = Join-Path $root "png\app-icon"
$storeDir = Join-Path $root "png\store"

function New-Canvas($width, $height) {
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  return @($bitmap, $graphics)
}

function New-Brush($hex) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}

function New-Pen($hex, $width) {
  $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($hex)), $width
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  return $pen
}

function Add-RoundedRect($graphics, $x, $y, $w, $h, $r, $brush, $pen = $null) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  if ($brush) { $graphics.FillPath($brush, $path) }
  if ($pen) { $graphics.DrawPath($pen, $path) }
  $path.Dispose()
}

function Draw-Ball($graphics, $cx, $cy, $r) {
  $white = New-Brush "#F4F8F1"
  $dark = New-Brush "#151A17"
  $mid = New-Brush "#303633"
  $outline = New-Pen "#101714" ([Math]::Max(2, $r * .08))
  $graphics.FillEllipse($white, $cx - $r, $cy - $r, $r * 2, $r * 2)
  $graphics.DrawEllipse($outline, $cx - $r, $cy - $r, $r * 2, $r * 2)
  $pentagon = New-Object System.Drawing.PointF[] 5
  for ($i = 0; $i -lt 5; $i++) {
    $a = (-90 + $i * 72) * [Math]::PI / 180
    $pentagon[$i] = New-Object System.Drawing.PointF (($cx + [Math]::Cos($a) * $r * .42), ($cy + [Math]::Sin($a) * $r * .42))
  }
  $graphics.FillPolygon($dark, $pentagon)
  $graphics.FillEllipse($mid, $cx - $r * .72, $cy + $r * .05, $r * .46, $r * .38)
  $graphics.FillEllipse($mid, $cx + $r * .26, $cy + $r * .05, $r * .46, $r * .38)
  $white.Dispose(); $dark.Dispose(); $mid.Dispose(); $outline.Dispose()
}

function Draw-Mark($graphics, $scale, $offsetX, $offsetY) {
  $greenPen = New-Pen "#00E676" (92 * $scale)
  $whitePen = New-Pen "#EAF1E8" (38 * $scale)
  $gold = New-Brush "#FFC83D"

  $graphics.DrawLine($greenPen, $offsetX + 276 * $scale, $offsetY + 284 * $scale, $offsetX + 612 * $scale, $offsetY + 284 * $scale)
  $graphics.DrawArc($greenPen, $offsetX + 512 * $scale, $offsetY + 284 * $scale, 200 * $scale, 200 * $scale, 270, 180)
  $graphics.DrawLine($greenPen, $offsetX + 612 * $scale, $offsetY + 484 * $scale, $offsetX + 392 * $scale, $offsetY + 484 * $scale)
  $graphics.DrawLine($greenPen, $offsetX + 392 * $scale, $offsetY + 484 * $scale, $offsetX + 392 * $scale, $offsetY + 736 * $scale)
  $graphics.DrawLine($greenPen, $offsetX + 392 * $scale, $offsetY + 512 * $scale, $offsetX + 672 * $scale, $offsetY + 512 * $scale)

  $bolt = @(
    [System.Drawing.PointF]::new($offsetX + 652 * $scale, $offsetY + 268 * $scale),
    [System.Drawing.PointF]::new($offsetX + 542 * $scale, $offsetY + 490 * $scale),
    [System.Drawing.PointF]::new($offsetX + 684 * $scale, $offsetY + 490 * $scale),
    [System.Drawing.PointF]::new($offsetX + 528 * $scale, $offsetY + 756 * $scale),
    [System.Drawing.PointF]::new($offsetX + 574 * $scale, $offsetY + 538 * $scale),
    [System.Drawing.PointF]::new($offsetX + 450 * $scale, $offsetY + 538 * $scale)
  )
  $graphics.FillPolygon($gold, $bolt)

  Draw-Ball $graphics ($offsetX + 694 * $scale) ($offsetY + 342 * $scale) (120 * $scale)
  $graphics.DrawLine($whitePen, $offsetX + 272 * $scale, $offsetY + 286 * $scale, $offsetX + 462 * $scale, $offsetY + 286 * $scale)
  $graphics.DrawLine($whitePen, $offsetX + 282 * $scale, $offsetY + 512 * $scale, $offsetX + 392 * $scale, $offsetY + 512 * $scale)

  $greenPen.Dispose(); $whitePen.Dispose(); $gold.Dispose()
}

function Save-AppIcon($size, $name) {
  $canvas = New-Canvas $size $size
  $bmp = $canvas[0]
  $g = $canvas[1]
  $bg = New-Brush "#020806"
  $surface = New-Brush "#06140D"
  $border = New-Pen "#174A32" ([Math]::Max(2, $size * .008))
  Add-RoundedRect $g 0 0 $size $size ($size * .22) $bg
  Add-RoundedRect $g ($size * .092) ($size * .092) ($size * .816) ($size * .816) ($size * .18) $surface $border
  Draw-Mark $g ($size / 1024) 0 0
  $out = Join-Path $appIconDir $name
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $bg.Dispose(); $surface.Dispose(); $border.Dispose(); $g.Dispose(); $bmp.Dispose()
}

function Save-FeatureGraphic() {
  $canvas = New-Canvas 1024 500
  $bmp = $canvas[0]
  $g = $canvas[1]
  $bg = New-Brush "#020806"
  $surface = New-Brush "#06140D"
  $green = New-Brush "#00E676"
  $white = New-Brush "#F4F8F1"
  $muted = New-Brush "#87A093"
  $g.FillRectangle($bg, 0, 0, 1024, 500)
  Add-RoundedRect $g 650 70 280 280 64 $surface (New-Pen "#174A32" 4)
  Draw-Mark $g .28 620 40
  $fontTitle = New-Object System.Drawing.Font "Arial", 72, ([System.Drawing.FontStyle]::Bold)
  $fontSmall = New-Object System.Drawing.Font "Arial", 30, ([System.Drawing.FontStyle]::Bold)
  $footWidth = $g.MeasureString("Foot", $fontTitle).Width
  $g.DrawString("Foot", $fontTitle, $white, 92, 160)
  $g.DrawString("Match", $fontTitle, $green, 92 + $footWidth - 6, 160)
  $g.DrawString("Organise. Rejoins. Joue.", $fontSmall, $muted, 98, 260)
  $bmp.Save((Join-Path $storeDir "play-store-feature-graphic-1024x500.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $bg.Dispose(); $surface.Dispose(); $green.Dispose(); $white.Dispose(); $muted.Dispose(); $fontTitle.Dispose(); $fontSmall.Dispose(); $g.Dispose(); $bmp.Dispose()
}

function Save-Splash() {
  $canvas = New-Canvas 1290 2796
  $bmp = $canvas[0]
  $g = $canvas[1]
  $bg = New-Brush "#020806"
  $greenPen = New-Pen "#00E676" 8
  $greenPen.Color = [System.Drawing.Color]::FromArgb(28, [System.Drawing.ColorTranslator]::FromHtml("#00E676"))
  $green = New-Brush "#00E676"
  $white = New-Brush "#F4F8F1"
  $muted = New-Brush "#87A093"
  $g.FillRectangle($bg, 0, 0, 1290, 2796)
  $g.DrawEllipse($greenPen, 125, 660, 1040, 1040)
  $g.DrawLine($greenPen, 184, 1398, 1106, 1398)
  $g.DrawLine($greenPen, 645, 610, 645, 1790)
  Draw-Mark $g .6 337 830
  $fontTitle = New-Object System.Drawing.Font "Arial", 108, ([System.Drawing.FontStyle]::Bold)
  $fontSmall = New-Object System.Drawing.Font "Arial", 42, ([System.Drawing.FontStyle]::Bold)
  $footWidth = $g.MeasureString("Foot", $fontTitle).Width
  $matchWidth = $g.MeasureString("Match", $fontTitle).Width
  $totalWidth = $footWidth + $matchWidth - 6
  $logoX = (1290 - $totalWidth) / 2
  $g.DrawString("Foot", $fontTitle, $white, $logoX, 1564)
  $g.DrawString("Match", $fontTitle, $green, $logoX + $footWidth - 6, 1564)
  $tagline = "ORGANISE  REJOINS  JOUE"
  $taglineWidth = $g.MeasureString($tagline, $fontSmall).Width
  $g.DrawString($tagline, $fontSmall, $muted, (1290 - $taglineWidth) / 2, 1708)
  $bmp.Save((Join-Path $storeDir "footmatch-splash-1290x2796.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $bg.Dispose(); $greenPen.Dispose(); $green.Dispose(); $white.Dispose(); $muted.Dispose(); $fontTitle.Dispose(); $fontSmall.Dispose(); $g.Dispose(); $bmp.Dispose()
}

$sizes = @(1024, 512, 192, 180, 167, 152, 120, 87, 80, 76, 60, 58, 40, 29)
foreach ($size in $sizes) {
  Save-AppIcon $size "footmatch-app-icon-$size.png"
}

Copy-Item (Join-Path $appIconDir "footmatch-app-icon-512.png") (Join-Path $storeDir "play-store-icon-512.png") -Force
Copy-Item (Join-Path $appIconDir "footmatch-app-icon-1024.png") (Join-Path $storeDir "app-store-icon-1024.png") -Force
Save-FeatureGraphic
Save-Splash
