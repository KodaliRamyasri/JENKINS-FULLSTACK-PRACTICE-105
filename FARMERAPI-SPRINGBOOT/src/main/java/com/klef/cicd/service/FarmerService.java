package com.klef.cicd.service;

import java.util.List;
import com.klef.cicd.entity.Farmer;

public interface FarmerService {
    Farmer addFarmer(Farmer farmer);
    List<Farmer> getAllFarmers();
    Farmer getFarmerById(int id);
    Farmer updateFarmer(Farmer farmer);
    void deleteFarmerById(int id);
}
