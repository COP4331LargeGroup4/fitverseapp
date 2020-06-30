import * as React from 'react';
import { BottomNavigation, Text, View } from 'react-native-paper';
import Icon from '@mdi/react' // can i change the iconprovder to this? or add mdiAccountCowboyHat to react-native-icon-provider or whatever its called
import { mdiAccountCowboyHat } from '@mdi/js';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const ProfileRoute = () => <Text>Profile</Text>;

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Music', icon: 'music' },
    { key: 'albums', title: 'Albums', icon: 'album' },
	{ key: 'recents', title: 'Recents', icon: 'history' },
	{ key: 'profile', title: 'Profile', icon: 'account' }, // TODO: Change to https://materialdesignicons.com/icon/account-cowboy-hat
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
	recents: RecentsRoute,
	profile: ProfileRoute,
  });

  return (
	<BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default App;