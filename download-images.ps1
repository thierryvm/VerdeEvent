# Créer le dossier images s'il n'existe pas
if (-not (Test-Path -Path "public\images")) {
    New-Item -ItemType Directory -Path "public\images" -Force
}

# Télécharger les images
$images = @(
    @{
        Url = "https://images.unsplash.com/photo-1464808322410-1a934aab61e5?q=80&w=1920&auto=format"
        Destination = "public\images\hero-bg.jpg"
        Description = "Image de fond pour la section héros"
    },
    @{
        Url = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1920&auto=format"
        Destination = "public\images\event-planner.jpg"
        Description = "Image pour la section organisation d'événements"
    },
    @{
        Url = "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1920&auto=format"
        Destination = "public\images\garden-design.jpg"
        Description = "Image pour la section aménagement de jardins"
    },
    @{
        Url = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1920&auto=format"
        Destination = "public\images\testimonial-1.jpg"
        Description = "Image pour le premier témoignage"
    },
    @{
        Url = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format"
        Destination = "public\images\testimonial-2.jpg"
        Description = "Image pour le deuxième témoignage"
    },
    @{
        Url = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1920&auto=format"
        Destination = "public\images\testimonial-3.jpg"
        Description = "Image pour le troisième témoignage"
    },
    @{
        Url = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1920&auto=format"
        Destination = "public\images\testimonial-4.jpg"
        Description = "Image pour le quatrième témoignage"
    }
)

# Télécharger chaque image
foreach ($image in $images) {
    Write-Host "Téléchargement de $($image.Description) vers $($image.Destination)..."
    try {
        Invoke-WebRequest -Uri $image.Url -OutFile $image.Destination
        Write-Host "Téléchargement réussi!" -ForegroundColor Green
    } catch {
        Write-Host "Erreur lors du téléchargement: $_" -ForegroundColor Red
    }
}

Write-Host "Toutes les images ont été téléchargées avec succès!" -ForegroundColor Green
