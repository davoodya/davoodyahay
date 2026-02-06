# PowerShell Script to Add Person and WebSite Schemas to HTML Files
# Author: DavoodSec  
# Date: 2026-02-06

Write-Host "Starting Schema addition process..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Define the Person Schema
$personSchema = @'
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

    <!-- WebSite Schema -->
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

'@

# List of HTML files to process
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
    "pages\skills.html",
)

# Counters
$processedFiles = 0
$skippedFiles = 0

foreach ($file in $files) {
    $fullPath = Join-Path $PSScriptRoot $file
    
    if (-not (Test-Path $fullPath)) {
        Write-Host "`nFile not found: $file" -ForegroundColor Red
        $skippedFiles++
        continue
    }
    
    Write-Host "`nProcessing: $file" -ForegroundColor Yellow
    
    # Read file as array of lines
    $content = Get-Content $fullPath -Encoding UTF8
    
    # Check if Person Schema already exists
    $hasPersonSchema = ($content | Select-String -Pattern '<!-- Person Schema -->').Count -gt 0
    $hasWebSiteSchema = ($content | Select-String -Pattern '<!-- WebSite Schema -->').Count -gt 0
    
    if ($hasPersonSchema -and $hasWebSiteSchema) {
        Write-Host "  ✓ Schemas already exist. Skipping..." -ForegroundColor Gray
        $skippedFiles++
        continue
    }
    
    # Find the line number of </body>
    $bodyEndLine = -1
    for ($i = 0; $i -lt $content.Count; $i++) {
        if ($content[$i] -match '</body>') {
            $bodyEndLine = $i
            break
        }
    }
    
    if ($bodyEndLine -eq -1) {
        Write-Host "  ✗ Could not find closing body tag. Skipping..." -ForegroundColor Red
        $skippedFiles++
        continue
    }
    
    # Insert schemas before </body>
    $newContent = @()
    $newContent += $content[0..($bodyEndLine-1)]
    $newContent += $personSchema
    $newContent += ""
    $newContent += $content[$bodyEndLine..($content.Count-1)]
    
    # Save the file
    $newContent | Out-File -FilePath $fullPath -Encoding UTF8
    
    Write-Host "  ✓ Schemas added successfully!" -ForegroundColor Green
    $processedFiles++
}

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "Process completed!" -ForegroundColor Green
Write-Host "  - Files processed: $processedFiles" -ForegroundColor Green
Write-Host "  - Files skipped: $skippedFiles" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
