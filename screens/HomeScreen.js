import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Button,
    Modal,
} from 'react-native';
// import { FileSystem } from 'expo';

import { MonoText } from '../components/StyledText';
import unsplash from '../api/unsplash';
import styles from '../assets/css/homeCss'
function Separator() {
    return <View style={styles.separator} />;
}
// const formdata = new FormData()
// formdata.append('method', 'getQuote')
// formdata.append('key', '457653')
// formdata.append('format', 'json')
// formdata.append('lang', 'en')
const HomeScreen = () => {
    const [text, setText] = useState('')
    const [images, setImages] = useState(false)
    // const [quote, setQuote] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [modal, setModal] = useState({ url: '', description: '' })

    const onSearchSubmit = async () => {
        const response = await unsplash.get('/search/photos', { params: { query: text } })
        setImages(response.data.results)
    };

    // const getDailyQuote = () => {
    //   return axios({
    //     url: 'http://api.forismatic.com/api/1.0/',
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     data: formdata,
    //   })
    //     .then(response => response.data)
    //     .then(data => {
    //       console.log(data)
    //       setQuote(data)
    //     })
    //     .catch(error => console.error(error))
    // }
    const activeModal = ({ description, urls }) => {
        setModal({ url: urls.regular, description, full: urls.full })
        setModalVisible(true)
    }
    // const downloadImage = () => {
    //   FileSystem.downloadAsync(
    //     modal.url,
    //     FileSystem.documentDirectory + 'tmp.png'
    //   )
    //     .then(({ uri }) => {
    //       console.log('Finished downloading to ', uri);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     })
    // }
    // const downloadImage = () => {
    //   var date = new Date();
    //   var image_URL = modal.url;
    //   var ext = getExtention(image_URL);
    //   ext = "." + ext[0];
    //   const { config, fs } = RNFetchBlob;
    //   let PictureDir = fs.dirs.PictureDir
    //   let options = {
    //     fileCache: true,
    //     addAndroidDownloads: {
    //       useDownloadManager: true,
    //       notification: true,
    //       path: PictureDir + "/image_" + Math.floor(date.getTime()
    //         + date.getSeconds() / 2) + ext,
    //       description: 'Image'
    //     }
    //   }
    //   config(options).fetch('GET', image_URL).then((res) => {
    //     Alert.alert("Image Downloaded Successfully.");
    //   });
    // }

    // const getExtention = (filename) => {
    //   return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
    //     undefined;
    // }
    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps='always'
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.welcomeContainer}>
                    <Image
                        source={
                            __DEV__
                                ? require('../assets/images/robot-dev.png')
                                : require('../assets/images/robot-prod.png')
                        }
                        style={styles.welcomeImage}
                    />
                    <MonoText>Jdzl.js</MonoText>
                </View>

                <View style={styles.getStartedContainer}>
                    {/* <DevelopmentModeNotice /> */}

                    {/* <Text style={styles.getStartedText}>Welcome to inmutable mobile app</Text>

          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>inmutable.js</MonoText>
          </View> */}

                    {/* <Text style={styles.getStartedText}>
            upload your file to put  the fucking signature
          </Text> */}
                </View>
                <Separator />
                {!!text &&
                    <View
                        style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                        <Text style={styles.getStartedText}>
                            {text}
                        </Text>
                    </View>
                }
                <View >
                    <TextInput
                        style={{ height: 40, color: 'rgb(54, 122, 227)', textAlign: 'center', backgroundColor: 'aliceblue' }}
                        placeholder="Type here to search!"
                        onChangeText={(text) => setText(text)}
                        value={text}
                    />
                    <Button title="Search" onPress={() => onSearchSubmit()} />
                </View>
                <View style={styles.gridMaster}>
                    {images && images.map((image, index) =>
                        <TouchableOpacity onPress={() => activeModal(image)} key={index}>
                            <Image
                                source={{ uri: image.urls.thumb }}
                                style={styles.welcomeImage}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.helpContainer}>
                    <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
                        <Text style={styles.helpLinkText}>
                            Need Help? visit here!
            </Text>
                    </TouchableOpacity>

                </View>
                {/* {quote &&
          <View style={styles.helpContainer}>
            <Text >
              {quote.quoteText}
            </Text>
            <Text >
              {quote.quoteAuthor}
            </Text>
          </View>
        } */}
            </ScrollView>
            <Modal visible={modalVisible}>

                <View style={styles.container} >
                    <Image
                        source={{ uri: modal.url }}
                        style={styles.modalImage}
                    />
                    <MonoText> {modal.description}</MonoText>
                    <Button title='back' onPress={() => setModalVisible(false)} />
                </View>

                <Button title='external URL' color="gray" onPress={() => handleHelpPressExternal(modal.full)} />

            </Modal>

            {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          :D
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            react native rlz
          </MonoText>
        </View>
      </View> */}
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};
export default HomeScreen

// function DevelopmentModeNotice() {
//   if (__DEV__) {
//     const learnMoreButton = (
//       <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
//         Learn more
//       </Text>
//     );

//     return (
//       <Text style={styles.developmentModeText}>
//         Development mode is enabled: your app will be slower but you can use
//         useful development tools. {learnMoreButton}
//       </Text>
//     );
//   } else {
//     return (
//       <Text style={styles.developmentModeText}>
//         You are not in development mode: your app will run at full speed.
//       </Text>
//     );
//   }
// }
const handleHelpPress = () => WebBrowser.openBrowserAsync('https://facebook.com/zljoan')

const handleHelpPressExternal = url => WebBrowser.openBrowserAsync(url)

