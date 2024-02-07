package com.jonas.tools.nai;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import lombok.Data;

@Data
public class FeedingRecord implements Serializable {
    /**
     * ID
     */
    private Integer id;

    /**
     * 喂养日期
     */
    private LocalDate date;

    /**
     * 喂养日期
     */
    private LocalTime time;

    /**
     * 【枚举定义】喂养行为类型
     */
    private String operation;

    /**
     * 喂养数据
     */
    private Integer value;

    /**
     * 创建人
     */
    private String creator;

    /**
     * 修改人
     */
    private String modifier;

    /**
     * 创建时间
     */
    private Date created;

    /**
     * 最后修改时间
     */
    private Date modified;

    @Serial
    private static final long serialVersionUID = 1L;
}
