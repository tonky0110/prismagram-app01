import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthHome from '../screens/Auth/AuthHome';
import Confirm from '../screens/Auth/Confirm';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';

const AuthNavigation = createStackNavigator(
	{
		AuthHome,
		Confirm,
		Login,
		Signup
	},
	{
		headerMode: 'none'
	}
);

export default createAppContainer(AuthNavigation);
