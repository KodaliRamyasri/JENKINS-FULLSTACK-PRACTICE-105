package com.klef.cicd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.cicd.entity.Farmer;
import com.klef.cicd.repository.FarmerRepository;

@Service
public class FarmerServiceImpl implements FarmerService {

    @Autowired
    private FarmerRepository farmerRepository;

    @Override
    public Farmer addFarmer(Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    @Override
    public List<Farmer> getAllFarmers() {
        return farmerRepository.findAll();
    }

    @Override
    public Farmer getFarmerById(int id) {
        Optional<Farmer> opt = farmerRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Farmer updateFarmer(Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    @Override
    public void deleteFarmerById(int id) {
        farmerRepository.deleteById(id);
    }
}
