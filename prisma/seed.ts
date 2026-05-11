import { PrismaClient } from '../generated/prisma'
const prisma = new PrismaClient()

async function main() {
  console.log('=============================================')
  console.log('🌱 Début du remplissage de la base de données')
  console.log('=============================================\n')

  // ==========================================
  // 1. GÉNÉRATION DES ÉMOTIONS
  // ==========================================
  console.log('🧠 Génération des émotions...')

  // Les 6 émotions de base d'Ekman et leurs sous-émotions
  const emotionsData = [
    {
      "libelle": "Joie",
      "emotionsN2": ["Fierté", "Enthousiasme", "Sérénité", "Gratitude", "Amusement", "Satisfaction"]
    },
    {
      "libelle": "Tristesse",
      "emotionsN2": ["Déception", "Mélancolie", "Désespoir", "Chagrin", "Solitude", "Nostalgie"]
    },
    {
      "libelle": "Colère",
      "emotionsN2": ["Frustration", "Indignation", "Agacement", "Fureur", "Rancune", "Jalousie"]
    },
    {
      "libelle": "Peur",
      "emotionsN2": ["Anxiété", "Inquiétude", "Terreur", "Appréhension", "Panique", "Nervosité"]
    },
    {
      "libelle": "Surprise",
      "emotionsN2": ["Étonnement", "Stupéfaction", "Confusion", "Émerveillement", "Choc"]
    },
    {
      "libelle": "Dégoût",
      "emotionsN2": ["Aversion", "Répulsion", "Mépris", "Écoeurement"]
    }
  ]

  for (const n1 of emotionsData) {
    // 1. Création ou mise à jour de l'émotion de Niveau 1
    const createdN1 = await prisma.emotionNiveau1.upsert({
      where: { libelle: n1.libelle },
      update: {},
      create: {
        libelle: n1.libelle,
      },
    })
    
    console.log(`✅ Création de N1: ${createdN1.libelle}`)

    // 2. Création des émotions de Niveau 2 liées
    for (const n2Libelle of n1.emotionsN2) {
      // On vérifie d'abord si elle existe pour ne pas créer de doublons
      const existingN2 = await prisma.emotionNiveau2.findFirst({
        where: { 
            libelle: n2Libelle,
            emotionN1Id: createdN1.id
        }
      })
      
      if (!existingN2) {
        await prisma.emotionNiveau2.create({
          data: {
            libelle: n2Libelle,
            emotionN1Id: createdN1.id
          }
        })
        console.log(`  -> Ajout de N2: ${n2Libelle}`)
      }
    }
  }


  // ==========================================
  // 2. GENERATION DES EVENEMENTS DE STRESS
  // ==========================================
  console.log('\nGeneration du questionnaire de stress...')

  const stressEventsData = [
    { description: "Deces du conjoint", points: 100 },
    { description: "Divorce", points: 73 },
    { description: "Separation conjugale", points: 65 },
    { description: "Peine de prison", points: 63 },
    { description: "Deces d'un proche parent", points: 63 },
    { description: "Maladie ou accident personnel", points: 53 },
    { description: "Mariage", points: 50 },
    { description: "Licenciement professionnel", points: 47 },
    { description: "Retraite", points: 45 },
    { description: "Grossesse", points: 40 },
    { description: "Difficultes sexuelles", points: 39 },
    { description: "Changement de situation financiere", points: 38 },
    { description: "Mort d'un ami proche", points: 37 },
    { description: "Changement de responsabilites au travail", points: 29 },
    { description: "Demenagement", points: 20 },
  ]

  for (const event of stressEventsData) {
    const existingEvent = await prisma.evenementStress.findFirst({
      where: { description: event.description }
    })

    if (!existingEvent) {
      await prisma.evenementStress.create({
        data: {
          description: event.description,
          points: event.points,
          isActif: true
        }
      })
      console.log(`Ajout de l'evenement: ${event.description}`)
    }
  }


  // ==========================================
  // 2. GÉNÉRATION DES EXERCICES DE RESPIRATION
  // ==========================================
  console.log('\n🫁 Génération des exercices de respiration...')

  const exercicesData = [
    {
      titre: "Cohérence Cardiaque",
      inspirationSec: 5,
      expirationSec: 5,
      retenueSec: 0
    },
    {
      titre: "Respiration Carrée",
      inspirationSec: 4,
      expirationSec: 4,
      retenueSec: 4
    },
    {
      titre: "Relaxation (4-7-8)",
      inspirationSec: 4,
      expirationSec: 8,
      retenueSec: 7
    }
  ]

  for (const exo of exercicesData) {
    // Comme le titre n'est pas @unique dans ton schéma, on utilise findFirst
    const existingExo = await prisma.exerciceRespiration.findFirst({
      where: { titre: exo.titre }
    })

    if (!existingExo) {
      await prisma.exerciceRespiration.create({
        data: {
          titre: exo.titre,
          inspirationSec: exo.inspirationSec,
          expirationSec: exo.expirationSec,
          retenueSec: exo.retenueSec,
          isCustom: false // Exercices globaux (Admin)
        }
      })
      console.log(`✅ Ajout de l'exercice: ${exo.titre}`)
    } else {
      console.log(`🔄 L'exercice existe déjà: ${exo.titre}`)
    }
  }

  console.log('\n✨ Génération terminée avec succès !')
}

main()
  .catch((e) => {
    console.error("❌ Une erreur est survenue pendant le seed :", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
