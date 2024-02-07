package com.jonas.tools.nai;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedingRecordRepo extends JpaRepository<FeedingRecord, Integer> {
}
