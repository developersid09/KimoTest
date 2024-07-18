import React, { useState } from 'react';
export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [session, setSession] = useState({
    loginFlag: false,
    userId: '',
    highLights: [
      {
        id: 1,
        title: 'Surfing',
        image: require('../Assets/Images/surfing_highlight.png'),
        description: "Best Hawaiian islands for surfing.",
        intro: "Hawaii is the capital of modern surfing. This group of Pacific islands gets swell from all directions, so there are plenty of pristine surf spots for all.",
        topSpots: {
          title: "Top spots",
          items: [
            {
              id: 1,
              title: 'Maui',
              image: require('../Assets/Images/maui.png'),
            },
            {
              id: 2,
              title: 'Kauai',
              image: require('../Assets/Images/kauai.png'),
            },
            {
              id: 3,
              title: 'Honolulu',
              image: require('../Assets/Images/honolulu.png'),
            }
          ]
        },
        guide: {
          name: "Hadwin Malone",
          period: "Guide since 2012",
          image: require('../Assets/Images/guide.png'),
          contact: "+91 8421458621",
        }
      },
      {
        id: 2,
        title: 'Hula',
        image: require('../Assets/Images/hula_highlight.png'),
        description: "Try it yourself.",
      },
      {
        id: 3,
        title: 'Vulcano',
        image: require('../Assets/Images/vulcano_highlight.png'),
        description: "Volcanic conditions can change at any time.",
      },
    ],
    catagories: [
      {
        id: 1,
        title: 'Adventure',
        image: require('../Assets/Images/surfing_highlight.png'),
        description: "Best Hawaiian islands for surfing.",
      },
      {
        id: 2,
        title: 'Culinary',
        image: require('../Assets/Images/hula_highlight.png'),
        description: "Try it yourself.",
      },
      {
        id: 3,
        title: 'Eco-tourism',
        image: require('../Assets/Images/vulcano_highlight.png'),
        description: "Volcanic conditions can change at any time.",
      },
      {
        id: 4,
        title: 'Family',
        image: require('../Assets/Images/surfing_highlight.png'),
        description: "Best Hawaiian islands for surfing.",
      },
      {
        id: 5,
        title: 'Sport',
        image: require('../Assets/Images/hula_highlight.png'),
        description: "Try it yourself.",
      },
    ],
    guide: {
      name: "Hadwin Malone",
      period: "Guide since 2012",
      image: require('../Assets/Images/guide.png'),
      contact: "+91 8421458621",
    }

  });

  return (
    <AppContext.Provider value={{ session, setSession }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
