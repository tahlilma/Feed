import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Card, Paragraph, Title, Button, Divider } from 'react-native-paper';
import Constants from 'expo-constants';

function FeedScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const dataFetcher = () => {
    fetch(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=5c3f2d2f31584d92ba6ed256c47321d0'
    )
      .then((res) => res.json())
      .then((resJSON) => {
        setData(resJSON.articles);
        setRefresh(false);
        setLoading(false);
        console.log(resJSON.articles);
      });
  };

  if (refresh) {
    dataFetcher();
  }

  useEffect(() => {
    dataFetcher();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <FlatList
        data={data}
        refreshing={refresh}
        onRefresh={() => setRefresh(true)}
        renderItem={({ item }) => {
          return (
            <Card style={{ marginTop: 8 }}>
              <Card.Cover source={{ uri: item.urlToImage }} />
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={() =>
                    navigation.navigate('Read More', { url: item.url })
                  }>
                  Read More
                </Button>
              </Card.Actions>
            </Card>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FeedScreen;
