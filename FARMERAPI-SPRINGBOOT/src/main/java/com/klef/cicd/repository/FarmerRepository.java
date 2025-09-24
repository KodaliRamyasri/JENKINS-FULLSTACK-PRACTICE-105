package com.klef.cicd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.cicd.entity.Farmer;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Integer> 
{
    Farmer findByEmail(String email);
    Farmer findByContact(String contact);
}
