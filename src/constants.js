const bars = [
    {
        id: '100beach',
        name: '100 Beach',
        theme: 'from-purple-600 to-indigo-600',
        menu: [
            { id: 1, name: 'Bulldog', price: 8, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 2, name: 'Mare', price: 10, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 3, name: "Hendrick's", price: 10, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 4, name: 'Malfy Rosa', price: 10, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 5, name: 'Tanqueray', price: 7, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 6, name: 'Nordés', price: 10, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 7, name: 'Oxford', price: 6, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 8, name: 'Primo', price: 12, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 9, name: 'Egoista', price: 12, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 10, name: 'Alba87', price: 12, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 11, name: 'Magnetico', price: 10, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 12, name: 'Cabala', price: 10, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 13, name: 'Alta Marea', price: 10, icon: '🍹', image: '/gintonic_image.webp', category: 'Gintoneria' },
            { id: 14, name: 'Spritz Aperol', price: 6.5, icon: '🍸', image: '/spritz_image.webp', category: 'I Classici' },
            { id: 15, name: 'Spritz Campari', price: 6.5, icon: '🍸', image: '/spritz_campari_image.webp', category: 'I Classici' },
            { id: 16, name: 'Spritz Select', price: 6.5, icon: '🍸', image: '/prosecco_image.webp', category: 'I Classici' },
            { id: 17, name: 'Hugo', price: 5, icon: '🍸', image: '/prosecco_image.webp', category: 'I Classici' },
            { id: 18, name: 'Americano', price: 6, icon: '🍸', image: '/old_fashioned_image.webp', category: 'I Classici' },
            { id: 19, name: 'Negroni', price: 7, icon: '🍸', image: '/old_fashioned_image.webp', category: 'I Classici' },
            { id: 20, name: 'Coca-Rum', price: 6, icon: '🍹', image: '/mojito_image.webp', category: 'I Classici' },
            { id: 21, name: 'Moscow Mule', price: 8, icon: '🍸', image: '/mojito_image.webp', category: 'I Classici' },
            { id: 22, name: 'London Mule', price: 8, icon: '🍸', image: '/margarita_image.webp', category: 'I Classici' },
            { id: 23, name: 'Mojito', price: 8, icon: '🍸', image: '/mojito_image.webp', category: 'I Classici' },
            { id: 24, name: 'Caipiroska', price: 8, icon: '🍸', image: '/prosecco_image.webp', category: 'I Classici' },
            { id: 25, name: 'Caipirinha', price: 8, icon: '🍸', image: '/prosecco_image.webp', category: 'I Classici' },
            { id: 26, name: 'Long Island', price: 9, icon: '🍸', image: '/margarita_image.webp', category: 'I Classici' },
            { id: 27, name: 'Margarita', price: 8, icon: '🍸', image: '/margarita_image.webp', category: 'I Classici' },
            { id: 28, name: 'Aperol Tassoni', price: 7, icon: '🍸', image: '/spritz_image.webp', category: 'I Classici' },
            { id: 29, name: 'Vodka Lemon', price: 6, icon: '🍸', image: '/prosecco_image.webp', category: 'I Classici' },
            { id: 30, name: 'Gin Lemon', price: 6, icon: '🍸', image: '/prosecco_image.webp', category: 'I Classici' },
            { id: 31, name: 'Campari Soda', price: 4, icon: '🍸', image: '/spritz_campari_image.webp', category: 'I Classici' },
            { id: 32, name: 'Black Russian', price: 7.5, icon: '🍸', image: '/old_fashioned_image.webp', category: 'I Classici' },
            { id: 33, name: 'Rossospicy', price: 8, icon: '🍹', image: '/old_fashioned_image.webp', category: 'Fatti da Noi' },
            { id: 34, name: 'Dave Collins', price: 7, icon: '🍹', image: '/spritz_campari_image.webp', category: 'Fatti da Noi' },
            { id: 35, name: 'Montenegroal', price: 7, icon: '🍹', image: '/prosecco_image.webp', category: 'Fatti da Noi' },
            { id: 36, name: 'Ginich', price: 8, icon: '🍹', image: '/gintonic_image.webp', category: 'Fatti da Noi' },
            { id: 37, name: 'Punch del Capo', price: 7, icon: '🍹', image: '/margarita_image.webp', category: 'Fatti da Noi' },
            { id: 38, name: 'Paloma', price: 8, icon: '🍹', image: '/mojito_image.webp', category: 'Fatti da Noi' },
            { id: 39, name: 'Sanbittèr', price: 3.5, icon: '🥤', image: '/beer_image.webp', category: 'Analcolici' },
            { id: 40, name: 'Crodino', price: 3.5, icon: '🥤', image: '/beer_image.webp', category: 'Analcolici' },
            { id: 41, name: 'Tassoni', price: 3.5, icon: '🥤', image: '/beer_image.webp', category: 'Analcolici' },
            { id: 42, name: 'Shakerato alla frutta', price: 5, icon: '🥤', image: '/prosecco_image.webp', category: 'Analcolici' },
            { id: 43, name: 'Shakerato allo zenzero', price: 5.5, icon: '🥤', image: '/prosecco_image.webp', category: 'Analcolici' },
            { id: 44, name: 'Margherita', price: 7, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 45, name: 'Diavola', price: 10, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 46, name: 'Salsiccia', price: 10, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 47, name: 'Wurstel', price: 9, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 48, name: 'Capricciosa', price: 10, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 49, name: 'Crudo, Squacquerone e Rucola', price: 12, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 50, name: 'Bufala, Pomodorini e Basilico', price: 12, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 51, name: 'Porcini, Gorgonzola, Salsiccia e Noci', price: 13, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 52, name: 'Mortadella, Stracciatella e Pistacchi', price: 12, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 53, name: 'Crudo, Stracciatella, Cipolla Caramellata', price: 12, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 54, name: 'Ciliegini Rossi e Gialli, Pesto e Stracciatella', price: 12, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 55, name: 'Crema di Tartufo, Pancetta e Mozzarella', price: 13, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' },
            { id: 56, name: 'Pala 1/2 metro Margherita', price: 21, icon: '🍕', image: '/pizza_image.webp', category: 'Pizza' }
        ]
    }
];

// Dynamically extract unique categories from the menu
const MENU_CATEGORIES = [...new Set(bars[0].menu.map(item => item.category))];

export { bars, MENU_CATEGORIES };
export default bars;
