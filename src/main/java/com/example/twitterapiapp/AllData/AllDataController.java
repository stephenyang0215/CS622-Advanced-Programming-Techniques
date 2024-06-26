/*
    Class: AllDataController
    Description: The controller for All Post endpoint
 */
package com.example.twitterapiapp.AllData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AllDataController {
    @Autowired
    AllDataService allDataService;

    @RequestMapping("/findAllData")
    @ResponseBody
    public List<AllDataSpring> findAllData() {
        return allDataService.getAllData();
    }

    @RequestMapping("/keywordFindTweets")
    @ResponseBody
    public List<AllDataSpring.Record> keywordFindTweets(@RequestParam String keyword){
        return allDataService.getTweetsByKeyword(keyword);
    }

}


