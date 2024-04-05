package com.jonas.tools.nai;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.sql.Update;

@Data
@Entity
@Table(name = "bt_feeding_record")
public class FeedingRecord implements Serializable {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull(groups = EntityGroup.Update.class)
    private Long id;

    /**
     * 喂养日期
     */
    @NotNull
    private LocalDate date;

    /**
     * 喂养日期
     */
    @NotNull
    private LocalTime time;

    /**
     * 【枚举定义】喂养行为类型
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    private Operation operation;

    /**
     * 喂养数据
     */
    @NotNull
    private Integer value1;

    /**
     * 喂养数据
     */
    private Integer value2;

    /**
     * 创建人
     */
    @NotBlank
    private String creator;

    /**
     * 修改人
     */
    @NotBlank
    private String modifier;

    /**
     * 创建时间
     */
    @NotNull
    private Date created;

    /**
     * 最后修改时间
     */
    @NotNull
    private Date modified;

    @Serial
    private static final long serialVersionUID = 1L;

    public void setCreatedAndModified(Date date) {
        this.created = date;
        this.modified = date;
    }

    public void setCreatorAndModifier(String username) {
        this.creator = username;
        this.modifier = username;
    }
}
