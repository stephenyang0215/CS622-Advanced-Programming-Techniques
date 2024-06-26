import {AppShell, Container, Group, TextInput,Text, Button, Card, Stack, AppShellHeader } from '@mantine/core';
import HomeCard from '@/components/HomeCard';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import {Header} from '@/components/Header';
import {NavBar} from '@/components/NavBar';
import { useEffect, useState } from 'react';

interface Tweet {
  id: string,
  tweets: string;
}

export function HomePage() {
  const [data, setData] = useState<Tweet []>([]);


   useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/findAllTweets'); // Replace with your actual API endpoint
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No access token found');
    return;
  }
    const response = await fetch(
      `http://localhost:8080/removeTweetsById?id=${encodeURIComponent(id)}&accessToken=${encodeURIComponent(token)}`,{
    
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as required
    },
    
    });
    if (response.ok) {
      console.log('Tweet deleted');
    } else {
      console.error('Failed to delete tweet');
    } 
 
  }
  
  const handlePost = async (tweetText: string) => {
    const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No access token found');
    return;
  }
    const response = await fetch(
      `http://localhost:8080/addTweets?accessToken=${encodeURIComponent(token)}&Tweets=${encodeURIComponent(tweetText)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      console.log('Tweet posted');
    } else {
      console.error('Failed to post tweet');
    }
  
  }
 
  return (
    <AppShell
    header={{ height: 60 }}
    navbar={{
      width: 200,
      breakpoint: 'sm',
      collapsed: { mobile: !open },
    }}
    padding="sm"
    
    >
      
      
    <AppShell.Header p="xs" style={{ backgroundColor: '#1DA1F2', color: 'white' }}>
      
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Text style={{ color: 'white', fontWeight: 1000 }}>Twitter Fetch</Text>
      
  </Container>
  </AppShell.Header>
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
    <AppShell.Main>
  <Stack
      bg="var(--mantine-color-body)"
  align="center"
  gap="sm"
>
  <PostCard 
    onPost={handlePost}
  />
   
 
 {data.map((item: Tweet) => {
        return(
          <HomeCard
          key={item.id}
          id={item.id}
          tweet={item.tweets}
          onDelete={handleDelete}
          /> 
        )
          
  })}
    </Stack>
    </AppShell.Main>

</AppShell>
  

  
    
  );
}
