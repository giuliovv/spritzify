const bars = [
    {
        id: '100beach',
        name: '100 Beach',
        theme: 'from-purple-600 to-indigo-600',
        email: 'bagnorenata100@gmail.com',
        menu: [
            { id: 1, name: 'Bulldog', price: 8, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 2, name: 'Mare', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 3, name: "Hendrick's", price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 4, name: 'Malfy Rosa', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 5, name: 'Tanqueray', price: 7, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 6, name: 'Nordés', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 7, name: 'Oxford', price: 6, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 8, name: 'Primo', price: 12, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 9, name: 'Egoista', price: 12, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 10, name: 'Alba87', price: 12, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 11, name: 'Magnetico', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 12, name: 'Cabala', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 13, name: 'Alta Marea', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 14, name: 'Spritz Aperol', price: 6.5, image: '/images/spritz_image.webp', category: 'I Classici' },
            { id: 15, name: 'Spritz Campari', price: 6.5, image: '/images/spritz_campari_image.webp', category: 'I Classici' },
            { id: 16, name: 'Spritz Select', price: 6.5, image: '/images/prosecco_image.webp', category: 'I Classici' },
            { id: 17, name: 'Hugo', price: 6.5, image: '/images/prosecco_image.webp', category: 'I Classici' },
            { id: 18, name: 'Americano', price: 6, image: '/images/old_fashioned_image.webp', category: 'I Classici' },
            { id: 19, name: 'Negroni', price: 7, image: '/images/old_fashioned_image.webp', category: 'I Classici' },
            { id: 20, name: 'Coca-Rum', price: 6, image: '/images/mojito_image.webp', category: 'I Classici' },
            { id: 21, name: 'Moscow Mule', price: 8, image: '/images/mojito_image.webp', category: 'I Classici' },
            { id: 22, name: 'London Mule', price: 8, image: '/images/margarita_image.webp', category: 'I Classici' },
            { id: 23, name: 'Mojito', price: 8, image: '/images/mojito_image.webp', category: 'I Classici' },
            { id: 24, name: 'Caipiroska', price: 8, image: '/images/prosecco_image.webp', category: 'I Classici' },
            { id: 25, name: 'Caipirinha', price: 8, image: '/images/prosecco_image.webp', category: 'I Classici' },
            { id: 26, name: 'Long Island', price: 9, image: '/images/margarita_image.webp', category: 'I Classici' },
            { id: 27, name: 'Margarita', price: 8, image: '/images/margarita_image.webp', category: 'I Classici' },
            { id: 28, name: 'Aperol Tassoni', price: 7, image: '/images/spritz_image.webp', category: 'I Classici' },
            { id: 29, name: 'Vodka Lemon', price: 6, image: '/images/prosecco_image.webp', category: 'I Classici' },
            { id: 30, name: 'Gin Lemon', price: 6, image: '/images/prosecco_image.webp', category: 'I Classici' },
            { id: 31, name: 'Campari Soda', price: 4, image: '/images/spritz_campari_image.webp', category: 'I Classici' },
            { id: 32, name: 'Black Russian', price: 7.5, image: '/images/old_fashioned_image.webp', category: 'I Classici' },
            { id: 33, name: 'Rossospicy', price: 8, image: '/images/old_fashioned_image.webp', category: 'Fatti da Noi' },
            { id: 34, name: 'Dave Collins', price: 7, image: '/images/spritz_campari_image.webp', category: 'Fatti da Noi' },
            { id: 35, name: 'Montenegroal', price: 7, image: '/images/prosecco_image.webp', category: 'Fatti da Noi' },
            { id: 36, name: 'Ginich', price: 8, image: '/images/gintonic_image.webp', category: 'Fatti da Noi' },
            { id: 37, name: 'Punch del Capo', price: 7, image: '/images/margarita_image.webp', category: 'Fatti da Noi' },
            { id: 38, name: 'Paloma', price: 8, image: '/images/mojito_image.webp', category: 'Fatti da Noi' },
            { id: 39, name: 'Sanbittèr', price: 3.5, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 40, name: 'Crodino', price: 3.5, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 41, name: 'Tassoni', price: 3.5, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 42, name: 'Shakerato alla frutta', price: 5, image: '/images/prosecco_image.webp', category: 'Analcolici' },
            { id: 43, name: 'Shakerato allo zenzero', price: 5.5, image: '/images/prosecco_image.webp', category: 'Analcolici' },
            { id: 44, name: 'Margherita', price: 7, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 45, name: 'Diavola', price: 10, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 46, name: 'Salsiccia', price: 10, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 47, name: 'Wurstel', price: 9, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 48, name: 'Capricciosa', price: 10, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 49, name: 'Crudo, Squacquerone e Rucola', price: 12, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 50, name: 'Bufala, Pomodorini e Basilico', price: 12, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 51, name: 'Porcini, Gorgonzola, Salsiccia e Noci', price: 13, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 52, name: 'Mortadella, Stracciatella e Pistacchi', price: 12, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 53, name: 'Crudo, Stracciatella, Cipolla Caramellata', price: 12, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 54, name: 'Ciliegini Rossi e Gialli, Pesto e Stracciatella', price: 12, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 55, name: 'Crema di Tartufo, Pancetta e Mozzarella', price: 13, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 56, name: 'Pala 1/2 metro Margherita', price: 21, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 57, name: 'Forst VIP alla spina piccola', price: 3, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 58, name: 'Forst VIP alla spina media', price: 5.5, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 59, name: 'Forst VIP alla spina grande', price: 11, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 60, name: 'Forst Felsenkeller alla spina piccola', price: 3, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 61, name: 'Forst Felsenkeller alla spina media', price: 5.5, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 62, name: 'Forst Felsenkeller alla spina grande', price: 11, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 63, name: 'Hoegarden alla spina piccola', price: 3, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 64, name: 'Hoegarden alla spina media', price: 5.5, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 65, name: 'Hoegarden alla spina grande', price: 11, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 66, name: 'Corona 33cl', price: 4, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 67, name: 'Ceres 33cl', price: 4, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 68, name: 'Menabrea 66cl', price: 5.5, image: '/images/beer_image.webp', category: 'Birra' },
            { id: 69, name: 'Coca in lattina', price: 2.6, image: '/images/can_image.webp', category: 'Analcolici' },
            { id: 70, name: 'Coca zero in lattina', price: 2.6, image: '/images/can_image.webp', category: 'Analcolici' },
            { id: 71, name: 'Coca in vetro', price: 3, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 72, name: 'Coca zero in vetro', price: 3, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 73, name: 'Sprite lattina', price: 2.6, image: '/images/can_image.webp', category: 'Analcolici' },
            { id: 74, name: 'Fanta lattina', price: 2.6, image: '/images/can_image.webp', category: 'Analcolici' },
            { id: 75, name: 'Lemon Soda lattina', price: 2.6, image: '/images/can_image.webp', category: 'Analcolici' },
            { id: 76, name: 'Tè pesca in lattina', price: 2.6, image: '/images/can_image.webp', category: 'Analcolici' },
            { id: 77, name: 'Tè limone in lattina', price: 2.6, image: '/images/can_image.webp', category: 'Analcolici' },
            { id: 78, name: 'Tè bio Galvanina in Vetro pesca', price: 3.5, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 79, name: 'Tè bio Galvanina in Vetro limone', price: 3.5, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 80, name: 'Tè bio Galvanina in Vetro verde', price: 3.5, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 81, name: 'Tè bio Galvanina in Vetro bianco', price: 3.5, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 82, name: 'Redbull', price: 3, image: '/images/can_image.webp', category: 'Analcolici' },
            { id: 83, name: 'Gatorade', price: 3, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 84, name: 'Acqua 1/2 litro naturale', price: 1.5, image: '/images/water_image.webp', category: 'Analcolici' },
            { id: 85, name: 'Acqua 33cl frizzante', price: 1.3, image: '/images/water_image.webp', category: 'Analcolici' },
            { id: 86, name: 'Camparino', price: 4, image: '/images/camparino_image.webp', category: 'I Classici' },
            { id: 87, name: 'Trebbiano Rubicone - Sorsi', price: 10, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 88, name: 'Albana Secco - Nora - Podere Baratta', price: 18, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 89, name: 'Albana Secco - Albarara - Tenuta Santa Lucia', price: 18, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 90, name: 'Albana Secco - Zavalloni', price: 12, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 91, name: 'Famoso Rubicone - Tenuta Santa Lucia', price: 15, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 92, name: 'Passerina - Letizia - Terra Fageto', price: 20, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 93, name: 'Falanghina - Cortenormanna', price: 18, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 94, name: 'Sangiovese Rubicone - Sorsi', price: 10, image: '/images/rosso_image.webp', category: 'Vino' },
            { id: 95, name: 'Sangiovese Superiore - Podere Baracca', price: 15, image: '/images/rosso_image.webp', category: 'Vino' },
            { id: 96, name: 'Sangiovese Superiore - Zavalloni', price: 15, image: '/images/rosso_image.webp', category: 'Vino' },
            { id: 97, name: 'Trento DOC - Madonna delle Vittorie', price: 35, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 98, name: 'Franciacorta Rosè - Elisabetta Brami', price: 35, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 99, name: 'Franciacorta Satèn - Elisabetta Brami', price: 35, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 100, name: 'Sburoun Spumante - Novobelle', price: 18, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 101, name: 'Gran Cuvée Spumante - Serena', price: 18, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 102, name: 'Prosecco DOC Treviso - Serena', price: 16, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 103, name: 'Prosecco Millesimato - Montelliana', price: 16, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 104, name: 'Frizzante - Calice', price: 3.5, image: '/images/frizzante_image.webp', category: 'Vino' },
            { id: 105, name: 'Prosecco - Calice', price: 4.5, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 106, name: 'Trebbiano - Calice', price: 3.5, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 107, name: 'Albana - Calice', price: 4, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 108, name: 'Frqanciacorta - Calice', price: 7, image: '/images/bianco_image.webp', category: 'Vino' },
            { id: 109, name: 'Sfuso Frizzante alla Spina - 1L', price: 11, image: '/images/frizzante_image.webp', category: 'Vino' },
            { id: 110, name: 'Sfuso Frizzante alla Spina - 1/2L', price: 6, image: '/images/frizzante_image.webp', category: 'Vino' }
        ]
    },
    {
        id: 'testbar',
        name: 'Test Bar',
        theme: 'from-red-600 to-yellow-600',
        email: 'testbar@example.com',
        menu: [
            { id: 1, name: 'Spritz Aperol', price: 6.5, image: '/images/spritz_image.webp', category: 'I Classici' },
            { id: 2, name: 'Spritz Campari', price: 6.5, image: '/images/spritz_campari_image.webp', category: 'I Classici' },
            { id: 3, name: 'Spritz Select', price: 6.5, image: '/images/prosecco_image.webp', category: 'I Classici' },
            { id: 44, name: 'Margherita', price: 7, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 45, name: 'Diavola', price: 10, image: '/images/pizza_image.webp', category: 'Pizza' },
            { id: 76, name: 'Tè pesca in lattina', price: 2.6, image: '/images/can_image.webp', category: 'Analcolici' },
            { id: 77, name: 'Tè limone in lattina', price: 2.6, image: '/images/can_image.webp', category: 'Analcolici' },
            { id: 59, name: 'Birra', price: 11, image: '/images/beer_image.webp', category: 'Birra' },
        ]
    }
    ,
    {
        id: 'micamar',
        name: 'Micamar Bagno 99',
        theme: 'from-purple-600 to-indigo-600',
        email: 'pietro.fantini1998@gmail.com',
        menu: [
            { id: 1, name: 'Gin Tonic', price: 8, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 2, name: 'J.Rose', price: 12, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 3, name: 'Malfy', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 4, name: 'Hendrick’s', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 5, name: 'Gin Mare', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 6, name: 'Alba87 Gin', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 7, name: 'Amuerte', price: 12, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 8, name: 'Nordes', price: 10, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 9, name: 'Bulldog', price: 8, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 10, name: 'Falterona 1654', price: 8, image: '/images/gintonic_image.webp', category: 'Gintoneria' },
            { id: 11, name: 'Caipiroska', price: 8, image: '/images/mojito_image.webp', category: 'Pestati' },
            { id: 12, name: 'Caipirinha', price: 8, image: '/images/mojito_image.webp', category: 'Pestati' },
            { id: 13, name: 'Mojito', price: 8, image: '/images/mojito_image.webp', category: 'Pestati' },
            { id: 14, name: 'Mixed Fruit Mojito', price: 8, image: '/images/mojito_image.webp', category: 'Pestati' },
            { id: 15, name: 'Stra-Corona', price: 6, image: '/images/margarita_image.webp', category: 'Le Nostre Specialità' },
            { id: 16, name: 'Sunsea', price: 8, image: '/images/spritz_campari_image.webp', category: 'Le Nostre Specialità' },
            { id: 17, name: 'Orgasmo', price: 8, image: '/images/margarita_image.webp', category: 'Le Nostre Specialità' },
            { id: 18, name: 'Barbie', price: 8, image: '/images/spritz_campari_image.webp', category: 'Le Nostre Specialità' },
            { id: 19, name: 'Bob Marley', price: 8, image: '/images/margarita_image.webp', category: 'Le Nostre Specialità' },
            { id: 20, name: 'Sexy Red', price: 8, image: '/images/spritz_campari_image.webp', category: 'Le Nostre Specialità' },
            { id: 21, name: 'The Megan', price: 8, image: '/images/margarita_image.webp', category: 'Le Nostre Specialità' },
            { id: 22, name: 'Spritz Aperol', price: 7, image: '/images/spritz_image.webp', category: 'Pre-Dinner e Aperitivi' },
            { id: 23, name: 'Spritz Campari', price: 7, image: '/images/spritz_campari_image.webp', category: 'Pre-Dinner e Aperitivi' },
            { id: 24, name: 'Hugo Spritz', price: 7, image: '/images/old_fashioned_image.webp', category: 'Pre-Dinner e Aperitivi' },
            { id: 25, name: 'Negroni', price: 8, image: '/images/spritz_image.webp', category: 'Pre-Dinner e Aperitivi' },
            { id: 26, name: 'Negroni Sbagliato', price: 7.5, image: '/images/spritz_campari_image.webp', category: 'Pre-Dinner e Aperitivi' },
            { id: 27, name: 'Americano', price: 7, image: '/images/old_fashioned_image.webp', category: 'Pre-Dinner e Aperitivi' },
            { id: 28, name: 'Love Mimosa', price: 8, image: '/images/spritz_image.webp', category: 'Pre-Dinner e Aperitivi' },
            { id: 29, name: 'Campari Soda e Prosecco', price: 6, image: '/images/spritz_campari_image.webp', category: 'Pre-Dinner e Aperitivi' },
            { id: 30, name: 'Sex on the Beach', price: 8, image: '/images/spritz_image.webp', category: 'Long Drinks' },
            { id: 31, name: 'Long Island', price: 8, image: '/images/margarita_image.webp', category: 'Long Drinks' },
            { id: 32, name: 'Wodka Lemon', price: 7, image: '/images/spritz_campari_image.webp', category: 'Long Drinks' },
            { id: 33, name: 'Wodka Redbull', price: 7, image: '/images/old_fashioned_image.webp', category: 'Long Drinks' },
            { id: 34, name: 'Coca Rum', price: 7, image: '/images/margarita_image.webp', category: 'Long Drinks' },
            { id: 35, name: 'Moscow Mule', price: 8, image: '/images/spritz_image.webp', category: 'Long Drinks' },
            { id: 36, name: 'Angelo Azzurro', price: 8, image: '/images/spritz_campari_image.webp', category: 'Long Drinks' },
            { id: 37, name: 'Quattro Bianchi (con sciroppo)', price: 8, image: '/images/old_fashioned_image.webp', category: 'Long Drinks' },
            { id: 38, name: 'Mojito Analcolico', price: 7, image: '/images/mojito_image.webp', category: 'Analcolici' },
            { id: 39, name: 'Analcolico alla Frutta #99', price: 7, image: '/images/mojito_image.webp', category: 'Analcolici' },
            { id: 40, name: 'Pestato Analcolico', price: 8, image: '/images/mojito_image.webp', category: 'Analcolici' },
            { id: 41, name: 'Tassoni', price: 3, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 42, name: 'Crodino', price: 3, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 43, name: 'Bitter Rosso', price: 3, image: '/images/bottle_image.webp', category: 'Analcolici' },
            { id: 44, name: 'Gin Lemon', price: 8, image: '/images/gintonic_image.webp', category: 'Gintoneria' }
        ]
    }
];

export default bars;
