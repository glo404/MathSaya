import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ImageBackground, TouchableOpacity, ImageBackgroundComponent, SafeAreaView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Leksiyon = ({route}) => {
    const {data} = route.params;

    const LessonContentList = ({ content, index }) => {
        const navigation = useNavigation();
        return (
            <View 
            style={{
                paddingHorizontal: 20, 
                paddingVertical: 10, 
                flexDirection: 'row'
            }}>
                <Text style={{fontSize:55, fontWeight: 'bold', color: '#DAA520'}}>
                    {"0"+(index + 1)}
                </Text>
                <View style={{paddingHorizontal: 20, flex: 1}}>
                    <Text 
                    style={{
                        fontSize:15, 
                        color:"#A0A5BD", 
                        fontWeight:"500",
                        marginBottom: 5,
                    }}>
                        {content.time}
                    </Text>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: '#48D1CC'}}>
                        {content.title}
                    </Text>
                </View>
                <View style={{
                    width:40, 
                    height:40, 
                    backgroundColor: '#20B2AA',
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: 'center',
                }}>
                    <TouchableOpacity activeOpacity={0.8} onPress = {() => navigation.navigate("Learning")}>
                        <Icon 
                            name="play" 
                            size={25}
                            style={{color: '#fff'}} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={{backgroundColor:'#F0F8FF', flex:1}}>
            <ImageBackground 
                source={data.image} 
                style={{
                    height: 400,
                    paddingTop: 40,
                    paddingRight: 20,
                    paddingLeft: 20
                }}>
                <Text style={{fontSize:45, fontWeight: 'bold',marginTop: -40, color: '#000000'}}>
                    {data.name}
                </Text>
            </ImageBackground>
            <View 
            style={{
                flex: 1,
                marginTop: -35,
                backgroundColor: '#fefac0',
                borderTopRightRadius: 35,
                borderTopLeftRadius: 35,
            }}>
            <Text 
            style={{
                marginTop: 25,
                marginBottom: 20,
                marginHorizontal: 20,
                fontSize: 25,
                fontWeight: 'bold',
            }}>
            Topics
            </Text>
            <FlatList showsVerticalScrollIndicator={false}
            data={data.lessonContent}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
                <LessonContentList index={index} content={item}/>)}
            />
            </View>
        </SafeAreaView>
    );
};

export default Leksiyon;