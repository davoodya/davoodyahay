# ============================================================
# Smart Schema Injector (Head-based, Signature Detection)
# Author : DavoodSec
# Date   : 2026-02-06
# ============================================================

Write-Host "`n[+] Smart Schema Injection Started..." -ForegroundColor Green
Write-Host "------------------------------------------------------------" -ForegroundColor Cyan

# ---------------- Schema Blocks ----------------
$personSchema = @"
<!-- Person Schema -->
<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": "https://davoodya.ir/#person",
		"name": "داوود یاحی",
		"alternateName": [
			"Davood Yahay",
			"DavoodSec"
		],
		"url": "https://davoodya.ir/",
		"image": {
			"@type": "ImageObject",
			"url": "https://davoodya.ir/images/davoodyahay.jpg",
			"caption": "Davood Yahay – Cybersecurity Specialist"
		},
		"description": "داوود یاحی متخصص، مشاور و مدرس امنیت سایبری و تست نفوذ، توسعه‌دهنده ابزارهای امنیت تهاجمی و فریم‌ورک‌های تست نفوذ با بیش از ده سال تجربه حرفه‌ای در حوزه فناوری اطلاعات و آموزش امنیت سایبری.",
		"jobTitle": [
			"Cybersecurity Specialist",
			"Penetration Testing Specialist",
			"Offensive Security Tool Developer",
			"Cybersecurity Instructor",
			"Red Team",
			"Cyber Security and Penetration Test Teacher",
			"Cyber Security Consultant"
		],
		"hasOccupation": {
			"@type": "Occupation",
			"name": "Cybersecurity and Penetration Testing Specialist",
			"description": "Professional specializing in cybersecurity, penetration testing, red teaming, and development of offensive security tools.",
			"occupationLocation": {
				"@type": "Country",
				"name": "Iran"
			}
		},
		"knowsAbout": [
			"Cybersecurity",
			"Penetration Testing",
			"Ethical Hacking",
			"Red Teaming",
			"Offensive Security",
			"Security Tool Development",
			"C2 Framework Development",
			"Linux",
			"Networking",
			"Cybersecurity Training",
			"امنیت سایبری",
			"تست نفوذ",
			"هک قانونی",
			"تیم قرمز",
			"برنامه نویسی ابزارهای امنیتی",
			"شبکه کامپیوتری",
			"لینوکس",
			"میکروتیک",
			"برنامه نویس",
			"توسعه دهنده ابزار امنیتی",
			"مدرس امنیت سایبری",
			"توسعه دهنده مرکز کنترل و فرمان تخصصی",
			"مشاوره امنیت سایبری",
			"مشاوره تست نفوذ"
		],
		"knowsLanguage": [
			{
				"@type": "Language",
				"name": "Persian",
				"alternateName": "fa"
			},
			{
				"@type": "Language",
				"name": "English",
				"alternateName": "en"
			}
		],
		"hasCredential": {
			"@type": "EducationalOccupationalCredential",
			"credentialCategory": "Professional Experience",
			"name": "Self-taught Cybersecurity Specialist",
			"description": "Over 10 years of independent and professional experience in cybersecurity, penetration testing, and offensive security tool development."
		},
		"owns": [
			{
				"@type": "Organization",
				"@id": "https://davoodya.ir/#dsecurity",
				"name": "DSecurity",
				"url": "https://davoodya.ir"
			},
			{
				"@type": "Organization",
				"@id": "https://davoodya.ir/#yakuzadev",
				"name": "YakuzaDev"
			},
			{
				"@type": "Organization",
				"@id": "https://davoodya.ir/#yaweb",
				"name": "YaWeb"
			}
		],
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": "Cybersecurity Professional Services",
			"itemListElement": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Penetration Testing & Red Teaming",
						"description": "Professional penetration testing and offensive security assessments."
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Cybersecurity Consulting",
						"description": "Strategic and technical cybersecurity consulting services."
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Offensive Security Tools Developing",
						"description": "Design and Develop Penetration Test and Red Team Tools Special Expert in all type of C2(Command & Controllers)"
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Networking Administration",
						"description": "Run and manage small, medium and big computer networks"
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Linux Administration and Sys admin",
						"description": "Davood Yahay have Lpic1, Lpic2, Lpic3 Certificates Handle any Linux distro such as debian and redhat based linux."
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Cybersecurity Training",
						"description": "Professional cybersecurity and penetration testing training and mentoring."
					}
				}
			]
		},
		"sameAs": [
			"https://github.com/davoodya",
			"https://linkedin.com/in/davoodyahay",
			"https://x.com/davood_yahay",
			"https://instagram.com/davoodsec",
			"https://facebook.com/davoodsec",
			"https://youtube.com/@DavoodSec",
			"https://t.me/davoodsec",
			"https://t.me/davoodsec_forum",
			"https://pinterest.com/davoodya"
		],
		"mainEntityOfPage": {
			"@type": "ProfilePage",
			"@id": "https://davoodya.ir/"
		}
	}
</script>
"@

$websiteSchema = @"
<!-- Website Schema -->
<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": "https://davoodya.ir/#website",
		"url": "https://davoodya.ir/",
		"name": "Davood Yahay – Cybersecurity & Penetration Testing Specialist",
		"alternateName": [
			"داوود یاحی",
			"Davood Yahay Cybersecurity",
			"Davood Yahay Personal Website",
			"DavoodSec",
			"Davood Yahay Penetration Test"
		],
		"description": "Official personal website of Davood Yahay, cybersecurity and penetration testing specialist, offensive security tools developer, consultant, and instructor.",
		"publisher": {
			"@type": "Person",
			"@id": "https://davoodya.ir/#person"
		},
		"inLanguage": [
			"fa",
			"en"
		]
	}
</script>
"@

# ---------------- Detection Patterns ----------------
$personPattern  = '"@context"\s*:\s*"https://schema.org"[\s\S]*?"@type"\s*:\s*"Person"[\s\S]*?"@id"\s*:\s*"https://davoodya.ir/#person"'
$websitePattern = '"@context"\s*:\s*"https://schema.org"[\s\S]*?"@type"\s*:\s*"WebSite"[\s\S]*?"@id"\s*:\s*"https://davoodya.ir/#website"'

# ---------------- Files ----------------
$files = @(
    "pages\articles\hacking\CrackZIPFiles1.html",
    "pages\articles\network\ascii.html",
    "pages\articles\Security\hash_encrypt.html",
    "pages\articles\Security\unicode.html",
    "pages\courses\linux-lpic1.html",
    "pages\courses\advanced-ceh.html",
    "pages\courses\beginner-ceh.html",
    "pages\courses\network-plus.html",
    "pages\courses\ceh-plus-plus.html",
    "pages\courses\virtualization.html",
    "pages\tools\backdoor.html",
    "pages\tools\c2.html",
    "pages\tools\cracker.html",
    "pages\tools\malware.html",
    "pages\tools\python.html",
    "pages\about.html",
    "pages\contact.html",
    "pages\hall-of-fame.html",
    "pages\security-policy.html",
    "pages\articles.html",
    "pages\courses.html",
    "pages\portfolio.html",
    "pages\services.html",
    "pages\skills.html"
)

# ---------------- Counters ----------------
$modified = 0
$skipped  = 0

foreach ($file in $files) {

    $path = Join-Path $PSScriptRoot $file

    if (-not (Test-Path $path)) {
        Write-Host "[!] Missing file: $file" -ForegroundColor Red
        $skipped++
        continue
    }

    $html = Get-Content $path -Raw -Encoding UTF8

    # ---- Robust Detection ----
    $hasPerson =
        ($html -match '"@type"\s*:\s*"Person"') -and
        ($html -match '"@id"\s*:\s*"https://davoodya.ir/#person"') -and
        ($html -match '"@context"\s*:\s*"https://schema.org"')

    $hasWebsite =
        ($html -match '"@type"\s*:\s*"WebSite"') -and
        ($html -match '"@id"\s*:\s*"https://davoodya.ir/#website"') -and
        ($html -match '"@context"\s*:\s*"https://schema.org"')

    if ($hasPerson -and $hasWebsite) {
        Write-Host "[=] Schemas already exist: $file" -ForegroundColor Yellow
        $skipped++
        continue
    }

    if ($html -notmatch '</head>') {
        Write-Host "[!] No </head> found: $file" -ForegroundColor Red
        $skipped++
        continue
    }

    $insertSchemas = ""
    if (-not $hasPerson)  { $insertSchemas += "`n$personSchema" }
    if (-not $hasWebsite) { $insertSchemas += "`n$websiteSchema" }

    # Insert after favicon if exists
    if ($html -match '<link[^>]+rel=["'']?(icon|shortcut icon)["'']?[^>]*>') {
        $html = $html -replace '(<link[^>]+rel=["'']?(icon|shortcut icon)["'']?[^>]*>)', "`$1$insertSchemas"
    }
    else {
        $html = $html -replace '</head>', "$insertSchemas`n</head>"
    }

    Set-Content -Path $path -Value $html -Encoding UTF8
    Write-Host "[+] Updated: $file" -ForegroundColor Green
    $modified++
}

Write-Host "`n------------------------------------------------------------" -ForegroundColor Cyan
Write-Host "[✓] Completed Successfully" -ForegroundColor Green
Write-Host "    Modified : $modified"
Write-Host "    Skipped  : $skipped"
Write-Host "------------------------------------------------------------" -ForegroundColor Cyan