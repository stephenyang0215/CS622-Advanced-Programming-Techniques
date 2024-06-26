import {AppShell, Container, Group, TextInput,Text, Button, Card, Stack, AppShellHeader } from '@mantine/core';
import TweetCard from '@/components/Card/TweetCard';
import { useState, useEffect } from 'react';


interface Tweet {
    _id: number,
    account: string,
    tweet: string,
    url: string,
    hashtag: string[],
    search: string[],
    share_tweet: {},
    share_url: string,
    time: string,
    views: number;
    }
  
  interface dataItem {
    // id: string,
    records: Tweet[];
  }

export function AllDataPage() {
    const [data, setData] = useState<dataItem[]>([]);

    useEffect(() => {fetchAllData(), []});

    const fetchAllData = async () => {
        try {
            const response = await fetch('http://localhost:8080/findAllData'); // Replace with your actual API endpoint
            const AllData = await response.json();
            // console.log(jsonData);
            setData(AllData);
            // console.log(AllData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
 

    return(
    <AppShell>
        <Container>
          <h1>All Post</h1>
          
        <Container>
        {data.map((item: dataItem) => {
            return (item.records.map((post: Tweet) =>
              <TweetCard
                  key={post._id}
                  account={post.account}
                  tweet={post.tweet}
                  url={post.url}
                  hashtag={post.hashtag}
                  search={post.search}
                  share_tweet={post.share_tweet}
                  share_url={post.share_url}
                  time={post.time}
                  views={post.views}
              />
          ))
        
        })}
        </Container>
        
        <AppShell.Navbar>
                    <Container>
                    <Stack>
                        <a href="/">HomePage</a>
                              <a href="/alldata">All Post</a>
                              <a href="/searchAll">Search Timeline</a>
                              <a href="/searchPost">Search Post</a>
                              <a href="/bookmarks">Bookmarks</a>
                              <a href="/me">Profile</a>
                    </Stack>
                    </Container>
                </AppShell.Navbar>
                </Container>
                </AppShell>
        
    );
    
}