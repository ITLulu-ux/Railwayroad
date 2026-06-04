package RailwayApplication.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RailwayController {
    @GetMapping("/")
    public String first() {
        return "main"; // templates/main.html
    }

    @GetMapping("/second")
    public String second() {
        return "list"; // templates/list.html
    }

    @GetMapping("/second")
    public String third() {
        return "view"; // templates/view.html
    }
}

/*@RestController
@RequiredArgsConstructor
public class AutoController {
    private final AutoService autoService;

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> list(ControllerDto filter) {
        int page = filter.getPage() != null ? filter.getPage() : 0;
        int size = filter.getSize() != null ? filter.getSize() : 30;
        String dateFilter = filter.getDateFilter();
        String val2 = filter.getVal2();
        String val3 = filter.getVal3();

        Map<String, Object> result = new HashMap<>();
        result.put("data", autoService.getPaged(filter));
        result.put("totalCount", autoService.getTotalCount(filter));

        return ResponseEntity.ok(result);
    }

    @GetMapping("/dates")
    public List<String> getDates() {
        return autoService.getAvailableDates();
    }

    @GetMapping("/stats")
    public ResponseEntity<List<StatsResultDto>> getStats(StatsSearchDto dto) {
        return ResponseEntity.ok(autoService.getStats(dto));
    }
}*/