package com.example.slackjobs.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @RequestMapping(value = {"/", "/new"})
    public String index() {
        return "index.html";
    }
}
