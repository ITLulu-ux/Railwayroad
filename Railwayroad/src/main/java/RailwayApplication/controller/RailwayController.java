package RailwayApplication.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RailwayController {
    @GetMapping("/")
    public String first() {
        return "main"; // templates/main.html
    }

    @GetMapping("/list")
    public String second() {
        return "list"; // templates/list.html
    }

    @GetMapping("/view")
    public String third() {
        return "view"; // templates/view.html
    }
}
