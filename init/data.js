const sampleListings = [


    // ==================== TRENDING ====================

    {
        title: "Trending Sunset Villa",
        description: "A popular modern villa with incredible sunset views and a relaxing outdoor space.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
        },
        price: 3200,
        location: "Santorini",
        country: "Greece",
        category: "Trending",
        geometry: {
            type: "Point",
            coordinates: [25.4615, 36.3932],
        },
    },

    {
        title: "Trending Beach House",
        description: "A beautiful and popular beach house perfect for a relaxing vacation.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
        },
        price: 2800,
        location: "Maldives",
        country: "Maldives",
        category: "Trending",
        geometry: {
            type: "Point",
            coordinates: [73.2207, 3.2028],
        },
    },


    // ==================== ROOMS ====================

    {
        title: "Cozy City Room",
        description: "A comfortable private room located close to the heart of the city.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
        },
        price: 1200,
        location: "New York",
        country: "United States",
        category: "Rooms",
        geometry: {
            type: "Point",
            coordinates: [-74.006, 40.7128],
        },
    },

    {
        title: "Luxury Room with Mountain View",
        description: "A comfortable room with beautiful views of the surrounding mountains.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1560185008-b033106af5c3",
        },
        price: 1500,
        location: "Manali",
        country: "India",
        category: "Rooms",
        geometry: {
            type: "Point",
            coordinates: [77.1892, 32.2432],
        },
    },


    // ==================== ICONIC CITY ====================

    {
        title: "Iconic City Apartment",
        description: "Stay in the center of the city with amazing views and easy access to famous landmarks.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
        },
        price: 2100,
        location: "Paris",
        country: "France",
        category: "Iconic City",
        geometry: {
            type: "Point",
            coordinates: [2.3522, 48.8566],
        },
    },

    {
        title: "Downtown City Apartment",
        description: "Modern apartment located in the heart of a vibrant city.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        },
        price: 2300,
        location: "London",
        country: "United Kingdom",
        category: "Iconic City",
        geometry: {
            type: "Point",
            coordinates: [-0.1276, 51.5072],
        },
    },


    // ==================== MOUNTAINS ====================

    {
        title: "Mountain Cabin",
        description: "Relax in a peaceful cabin surrounded by beautiful mountains and fresh air.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
        },
        price: 1600,
        location: "Swiss Alps",
        country: "Switzerland",
        category: "Mountains",
        geometry: {
            type: "Point",
            coordinates: [8.2275, 46.8182],
        },
    },

    {
        title: "Himalayan Mountain Retreat",
        description: "A peaceful mountain stay surrounded by breathtaking Himalayan landscapes.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        },
        price: 1400,
        location: "Himachal Pradesh",
        country: "India",
        category: "Mountains",
        geometry: {
            type: "Point",
            coordinates: [77.1734, 31.1048],
        },
    },


    // ==================== CASTLES ====================

    {
        title: "Historic Stone Castle",
        description: "Stay in a beautifully preserved stone castle surrounded by green countryside and historic architecture.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=80&w=1200&auto=format&fit=crop",
        },
        price: 3800,
        location: "Edinburgh",
        country: "United Kingdom",
        category: "Castles",
        geometry: {
            type: "Point",
            coordinates: [-3.1883, 55.9533],
        },
    },

    {
        title: "Medieval Castle Stay",
        description: "Experience a unique stay inside a beautiful historic castle surrounded by nature.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
        },
        price: 4100,
        location: "Scotland",
        country: "United Kingdom",
        category: "Castles",
        geometry: {
            type: "Point",
            coordinates: [-4.2026, 56.4907],
        },
    },


    // ==================== AMAZING POOLS ====================

    {
        title: "Villa with Infinity Pool",
        description: "Relax beside a stunning infinity pool overlooking the ocean from this modern tropical villa.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
        },
        price: 3500,
        location: "Ubud",
        country: "Indonesia",
        category: "Amazing Pools",
        geometry: {
            type: "Point",
            coordinates: [115.2625, -8.5069],
        },
    },

    {
        title: "Ocean View Pool Villa",
        description: "Enjoy a spectacular swimming pool with breathtaking views of the ocean.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
        },
        price: 3900,
        location: "Bali",
        country: "Indonesia",
        category: "Amazing Pools",
        geometry: {
            type: "Point",
            coordinates: [115.1889, -8.4095],
        },
    },


    // ==================== CAMPING ====================

    {
        title: "Weekend Camping Escape",
        description: "Enjoy a simple outdoor adventure with beautiful scenery, fresh air, and a peaceful campsite.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7",
        },
        price: 500,
        location: "Colorado",
        country: "United States",
        category: "Camping",
        geometry: {
            type: "Point",
            coordinates: [-105.7821, 39.5501],
        },
    },

    {
        title: "Forest Camping Retreat",
        description: "Spend a peaceful night camping under the stars surrounded by beautiful nature.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
        },
        price: 650,
        location: "British Columbia",
        country: "Canada",
        category: "Camping",
        geometry: {
            type: "Point",
            coordinates: [-123.3656, 48.4284],
        },
    },


    // ==================== FARMS ====================

    {
        title: "Peaceful Farmhouse",
        description: "Enjoy a quiet countryside experience at this charming farmhouse surrounded by fields and nature.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
        },
        price: 1000,
        location: "Yorkshire",
        country: "United Kingdom",
        category: "Farms",
        geometry: {
            type: "Point",
            coordinates: [-1.5491, 53.9599],
        },
    },

    {
        title: "Countryside Farm Stay",
        description: "Relax in a peaceful farmhouse surrounded by green fields and beautiful countryside.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
        },
        price: 900,
        location: "Tuscany",
        country: "Italy",
        category: "Farms",
        geometry: {
            type: "Point",
            coordinates: [11.2558, 43.7711],
        },
    },


    // ==================== ARCTIC ====================

    {
        title: "Arctic Glass Igloo",
        description: "Stay warm inside a glass igloo while enjoying spectacular Arctic landscapes and winter skies.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73",
        },
        price: 3200,
        location: "Rovaniemi",
        country: "Finland",
        category: "Arctic",
        geometry: {
            type: "Point",
            coordinates: [25.7294, 66.5039],
        },
    },

    {
        title: "Northern Lights Cabin",
        description: "Experience the magical Arctic night from a cozy cabin beneath the northern lights.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1517825738774-7de9363ef735",
        },
        price: 3000,
        location: "Lapland",
        country: "Finland",
        category: "Arctic",
        geometry: {
            type: "Point",
            coordinates: [27.0288, 66.5039],
        },
    },


    // ==================== DOOMS ====================

    {
        title: "Glass Dome Under the Stars",
        description: "Spend a peaceful night beneath the stars in this beautiful glass dome surrounded by nature.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        },
        price: 2200,
        location: "Jasper",
        country: "Canada",
        category: "Dooms",
        geometry: {
            type: "Point",
            coordinates: [-117.9543, 52.8737],
        },
    },

    {
        title: "Mountain Dome Retreat",
        description: "Stay inside a modern glass dome surrounded by peaceful mountains and natural beauty.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
        },
        price: 2500,
        location: "Alberta",
        country: "Canada",
        category: "Dooms",
        geometry: {
            type: "Point",
            coordinates: [-114.0719, 51.1784],
        },
    },


    // ==================== BOATS ====================

    {
        title: "Private Yacht Stay",
        description: "Enjoy an unforgettable stay aboard a beautiful yacht surrounded by the Mediterranean Sea.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13",
        },
        price: 4200,
        location: "Monaco",
        country: "Monaco",
        category: "Boats",
        geometry: {
            type: "Point",
            coordinates: [7.4246, 43.7384],
        },
    },

    {
        title: "Luxury Boat Escape",
        description: "Enjoy a peaceful stay on a beautiful boat surrounded by clear blue water.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1540946485063-a40da27545f8",
        },
        price: 3800,
        location: "Mykonos",
        country: "Greece",
        category: "Boats",
        geometry: {
            type: "Point",
            coordinates: [25.3289, 37.4467],
        },
    },
{
    title: "Royal Highland Castle",
    description: "A grand historic castle surrounded by rolling green hills, offering a peaceful and memorable stay.",
    image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1520637836862-4d197d17c52a",
    },
    price: 3600,
    location: "Highlands",
    country: "Scotland",
    category: "Castles",
    geometry: {
        type: "Point",
        coordinates: [-4.2247, 57.4778],
    },
},

{
    title: "Fairytale Castle Retreat",
    description: "Stay in a charming castle surrounded by beautiful gardens, forests, and historic architecture.",
    image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    },
    price: 4300,
    location: "Bavaria",
    country: "Germany",
    category: "Castles",
    geometry: {
        type: "Point",
        coordinates: [11.4917, 48.7904],
    },
},

{
    title: "Lakeside Castle Estate",
    description: "A beautiful historic castle estate overlooking a peaceful lake and surrounded by lush countryside.",
    image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    price: 4500,
    location: "Lake District",
    country: "United Kingdom",
    category: "Castles",
    geometry: {
        type: "Point",
        coordinates: [-3.0760, 54.4609],
    },
},
];



module.exports = { data: sampleListings };