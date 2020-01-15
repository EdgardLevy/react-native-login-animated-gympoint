import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import LogoTitle from '~/components/LogoTitle';
import SignOut from '~/components/SignOut';

import CheckIns from './pages/CheckIns';
import HelpOrderAnswer from './pages/HelpOrders/Answer';
import HelpOrderList from './pages/HelpOrders/List';
import NewHelpOrder from './pages/HelpOrders/New';
import Sign from './pages/SignIn';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign,
        App: createBottomTabNavigator(
          {
            CheckIn: {
              screen: createStackNavigator(
                {
                  CheckIns,
                },
                {
                  headerLayoutPreset: 'center',
                  defaultNavigationOptions: {
                    headerTitle: () => <LogoTitle />,
                    headerRight: () => <SignOut />,
                    headerRightContainerStyle: {
                      marginRight: 20,
                    },
                  },

                  navigationOptions: {
                    tabBarLabel: 'Check-ins',
                    tabBarIcon: ({tintColor}) => (
                      <Icon name="edit-location" size={20} color={tintColor} />
                    ),
                  },
                }
              ),
            },
            HelpOrder: {
              screen: createStackNavigator(
                {
                  HelpOrderList,
                  NewHelpOrder,
                  HelpOrderAnswer,
                },
                {
                  headerLayoutPreset: 'center',
                  defaultNavigationOptions: {
                    headerTitle: () => <LogoTitle />,
                    headerRight: () => <SignOut />,
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                    headerRightContainerStyle: {
                      marginRight: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Ask Help',
                tabBarIcon: ({tintColor}) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4d64',
              inactiveTintColor: '#999999',
              tabStyle: {
                height: 54,
                alignItems: 'center',
                justifyContent: 'center',
              },
              style: {
                backgroundColor: '#fff',
                height: 60,
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
