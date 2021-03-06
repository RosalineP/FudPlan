export const SELECT_STYLES = {
    input: base => ({
        ...base,
        color: '#808080',
    }),
    singleValue: base => ({
        ...base,
        color: '#808080',
    }),
    control: (base, state) => ({
        ...base,
        border: state.isFocused ? 0 : 0,
        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
            border: state.isFocused ? 0 : 0,
        },
    }),
};

export const SELECT_THEME = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary25: '#A0C778',
        primary: '#FED833',
    },
});

export const OPTIONS_UNIT = [
    { value: 'oz', label: 'oz' },
    { value: 'g', label: 'g' },
    { value: 'cup', label: 'cup' },
    { value: 'package', label: 'package' },
];

export const OPTIONS_ICON = [
    { value: './fruit/apple.svg', label: 'apples' },
    { value: './fruit/banana.svg', label: 'bananas' },
    { value: './fruit/blueberries.svg', label: 'blueberries' },
    { value: './fruit/cherries.svg', label: 'cherries' },
    { value: './fruit/grapes.svg', label: 'grapes' },
    { value: './fruit/lemon.svg', label: 'lemons' },
    { value: './fruit/lime.svg', label: 'limes' },
    { value: './fruit/orange.svg', label: 'oranges' },
    { value: './fruit/peach.svg', label: 'peaches' },
    { value: './fruit/pear.svg', label: 'pears' },
    { value: './fruit/pineapple.svg', label: 'pineapples' },
    { value: './fruit/pomegranate.svg', label: 'pomegranates' },
    { value: './fruit/raspberry.svg', label: 'raspberries' },
    { value: './fruit/strawberry.svg', label: 'strawberries' },
    { value: './fruit/watermelon.svg', label: 'watermelons' },

    { value: './grain/baguette.svg', label: 'baguettes' },
    { value: './grain/biscuit.svg', label: 'biscuits' },
    { value: './grain/bread.svg', label: 'bread' },
    { value: './grain/cereals.svg', label: 'cereals' },
    { value: './grain/croissant.svg', label: 'croissants' },
    { value: './grain/flour.svg', label: 'flour' },
    { value: './grain/grain.svg', label: 'grains' },
    { value: './grain/noodles.svg', label: 'noodles' },
    { value: './grain/pasta.svg', label: 'pasta' },
    { value: './grain/ramen.svg', label: 'ramen' },
    { value: './grain/toast.svg', label: 'toast' },

    { value: './meat/bacon.svg', label: 'bacon' },
    { value: './meat/beef.svg', label: 'beef' },
    { value: './meat/chicken.svg', label: 'chicken' },
    { value: './meat/egg.svg', label: 'eggs' },
    { value: './meat/fish.svg', label: 'fish' },
    { value: './meat/lunchmeat.svg', label: 'lunchmeat' },
    { value: './meat/pork.svg', label: 'pork' },
    { value: './meat/poultry.svg', label: 'poultry' },
    { value: './meat/salami.svg', label: 'salami' },
    { value: './meat/sausage.svg', label: 'sausages' },
    { value: './meat/seafood.svg', label: 'seafood' },
    { value: './meat/shrimp.svg', label: 'shrimp' },

    { value: './sweets/cake.svg', label: 'cake' },
    { value: './sweets/candy.svg', label: 'candy' },
    { value: './sweets/chocolate.svg', label: 'chocolate' },
    { value: './sweets/cookies.svg', label: 'cookies' },
    { value: './sweets/cupcakes.svg', label: 'cupcakes' },
    { value: './sweets/doughnut.svg', label: 'doughnuts' },
    { value: './sweets/icecream.svg', label: 'icecream' },
    { value: './sweets/pie.svg', label: 'pie' },
    { value: './sweets/popsicles.svg', label: 'popsicles' },
    { value: './sweets/pudding.svg', label: 'pudding' },

    { value: './vegetable/asparagus.svg', label: 'asparagus' },
    { value: './vegetable/avocado.svg', label: 'avocado' },
    { value: './vegetable/beans.svg', label: 'beans' },
    { value: './vegetable/broccoli.svg', label: 'broccoli' },
    { value: './vegetable/cabbage.svg', label: 'cabbage' },
    { value: './vegetable/carrot.svg', label: 'carrots' },
    { value: './vegetable/cauliflower.svg', label: 'cauliflower' },
    { value: './vegetable/chives.svg', label: 'chives' },
    { value: './vegetable/corn.svg', label: 'corn' },
    { value: './vegetable/cucumber.svg', label: 'cucumber' },
    { value: './vegetable/eggplant.svg', label: 'eggplant' },
    { value: './vegetable/garlic.svg', label: 'garlic' },
    { value: './vegetable/greensleafleaves.svg', label: 'leafy greens' },
    { value: './vegetable/mushroom.svg', label: 'mushrooms' },
    { value: './vegetable/olives.svg', label: 'olives' },
    { value: './vegetable/onionred.svg', label: 'red onions' },
    { value: './vegetable/onionwhite.svg', label: 'white onions' },
    { value: './vegetable/peas.svg', label: 'peas' },
    { value: './vegetable/pepper.svg', label: 'pepper' },
    { value: './vegetable/pickles.svg', label: 'pickles' },
    { value: './vegetable/potatoes.svg', label: 'potatoes' },
    { value: './vegetable/pumpkin.svg', label: 'pumpkin' },
    { value: './vegetable/radish.svg', label: 'radishes' },
    { value: './vegetable/tomato.svg', label: 'tomatoes' },

    { value: './condiments/condiment.svg', label: 'condiment' },
    { value: './condiments/honey.svg', label: 'honey' },
    { value: './condiments/jam.svg', label: 'jam' },
    { value: './condiments/ketchup.svg', label: 'ketchup' },
    { value: './condiments/mustard.svg', label: 'mustard' },
    { value: './condiments/pepper.svg', label: 'pepper' },
    { value: './condiments/preserves.svg', label: 'preserves' },
    { value: './condiments/salt.svg', label: 'salt' },
    { value: './condiments/spices.svg', label: 'spices' },

    { value: './dairy/cheese.svg', label: 'cheese' },
    { value: './dairy/eggs.svg', label: 'eggs' },
    { value: './dairy/milk.svg', label: 'milk' },
    { value: './dairy/yogurt.svg', label: 'yogurt' },

    { value: './drinks/alcohol.svg', label: 'alcohol' },
    { value: './drinks/beer.svg', label: 'beer' },
    { value: './drinks/coffee.svg', label: 'coffee' },
    { value: './drinks/hotchocolate.svg', label: 'hot chocolate' },
    { value: './drinks/juice.svg', label: 'juice' },
    { value: './drinks/soda.svg', label: 'soda' },
    { value: './drinks/spirits.svg', label: 'spirits' },
    { value: './drinks/tea.svg', label: 'tea' },
    { value: './drinks/wine.svg', label: 'wine' },
];
