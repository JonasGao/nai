package com.jonas.tools.nai;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface FeedingSummaryRepo extends JpaRepository<FeedingSummary, FeedingSummaryId> {

    List<FeedingSummary> findByDateIn(Collection<LocalDate> dates, Sort sort);
}
