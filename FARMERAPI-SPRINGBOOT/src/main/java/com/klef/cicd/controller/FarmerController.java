package com.klef.cicd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.cicd.entity.Farmer;
import com.klef.cicd.service.FarmerService;

@RestController
@RequestMapping("/farmerapi/")
@CrossOrigin(origins = "*")
public class FarmerController {

    @Autowired
    private FarmerService farmerService;
    
    @GetMapping("/")
    public String home() {
        return "Farmer Management System API is running";
    }
    
    @PostMapping("/add")
    public ResponseEntity<Farmer> addFarmer(@RequestBody Farmer farmer) {
        Farmer savedFarmer = farmerService.addFarmer(farmer);
        return new ResponseEntity<>(savedFarmer, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Farmer>> getAllFarmers() {
        List<Farmer> farmers = farmerService.getAllFarmers();
        return new ResponseEntity<>(farmers, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getFarmerById(@PathVariable int id) {
        Farmer farmer = farmerService.getFarmerById(id);
        if (farmer != null) {
            return new ResponseEntity<>(farmer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Farmer with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateFarmer(@RequestBody Farmer farmer) {
        Farmer existing = farmerService.getFarmerById(farmer.getId());
        if (existing != null) {
            Farmer updatedFarmer = farmerService.updateFarmer(farmer);
            return new ResponseEntity<>(updatedFarmer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Farmer with ID " + farmer.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFarmer(@PathVariable int id) {
        Farmer existing = farmerService.getFarmerById(id);
        if (existing != null) {
            farmerService.deleteFarmerById(id);
            return new ResponseEntity<>("Farmer with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Farmer with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
