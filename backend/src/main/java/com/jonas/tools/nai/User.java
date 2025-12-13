package com.jonas.tools.nai;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "bt_user")
public class User implements Serializable {
    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 用户名
     */
    @NotBlank
    @Column(unique = true)
    private String name;

    /**
     * 密码
     */
    @NotBlank
    private String password;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 子女名称
     */
    private String childName;

    /**
     * 用户类型
     */
    @NotNull
    @Enumerated(EnumType.STRING)
    private UserType userType;

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
