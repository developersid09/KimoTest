import React, { useState } from 'react';
export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [session, setSession] = useState({
    loginFlag: false,
    userId: '',
    highLights: [
      {
        title: 'Surfing',
        image: require('../Assets/Images/surfing_highlight.png'),
        description: "Best Hawaiian islands for surfing.",
      },
      {
        title: 'Hula',
        image: require('../Assets/Images/hula_highlight.png'),
        description: "Try it yourself.",
      },
      {
        title: 'Vulcano',
        image: require('../Assets/Images/vulcano_highlight.png'),
        description: "Volcanic conditions can change at any time.",
      },
    ],
    catagories: [
      {
        title: 'Adventure',
        image: require('../Assets/Images/surfing_highlight.png'),
        description: "Best Hawaiian islands for surfing.",
      },
      {
        title: 'Culinary',
        image: require('../Assets/Images/hula_highlight.png'),
        description: "Try it yourself.",
      },
      {
        title: 'Eco-tourism',
        image: require('../Assets/Images/vulcano_highlight.png'),
        description: "Volcanic conditions can change at any time.",
      },
      {
        title: 'Family',
        image: require('../Assets/Images/surfing_highlight.png'),
        description: "Best Hawaiian islands for surfing.",
      },
      {
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
