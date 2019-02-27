import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { sendEmail } from '../mailer';
import ejs from 'ejs';

export const searchOnYouTube = ({ email, name, search_term }) => {  
  axios.get(`https://www.googleapis.com/youtube/v3/search?q=${search_term}&maxResults=3&part=snippet&order=date&type=video&key=AIzaSyDA9C_NqP5hn8M1kVZs7iJuVDnzjbiOynM`)
  .then(async response => {
    const toCompile = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../../views/email.ejs'), 'utf-8'));
    const compileData = [];

    response.data.items.forEach((item, i) => {
      compileData.push({
        title: item.snippet.title,
        description: item.snippet.description,
        thumb: item.snippet.thumbnails.medium.url,
        video_url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      })
    })
    sendEmail(email, `YouTube Alarm: ${name}`, toCompile({ data: compileData, title: search_term }));
    
  })
  .catch(e => console.log('error', e))
}