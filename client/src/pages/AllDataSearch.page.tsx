import { Container } from '@mantine/core';
import { useState} from 'react';
import  SearchBar  from '@/components/SearchBar';
import  TweetCard  from '@/components/Card/TweetCard';

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

export function AllDataSearchPage() {
    const [data, setData] = useState<Tweet[]>([]);
  
   
    
    const handleSearch = async (keyword: string) => {
        try {
            const response = await fetch(`http://localhost:8080/keywordFindTweets?keyword=${encodeURIComponent(keyword)}`); // Replace with your actual API endpoint
            const jsonData = await response.json();
            console.log(jsonData);
            setData(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        
    }
   
    return(
        <Container>
           
           <SearchBar onSearch={handleSearch} ></SearchBar>
           {data.map((post: Tweet) =>
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
          )}
        
      

             

        </Container>
    )
    
}