// Model example
import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey } from "sequelize-typescript";
import { Table } from "sequelize-typescript";
import { Category } from "./Category";
import { ServicePriceMapping } from "./ServicePriceMapping";


enum Types {
    Normal = 'Normal',
    VIP = 'Vip',
}

@Table({
    modelName: 'Service',
    tableName: 'service',
})
export class Service extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: 'id' })
    id: number;

    @ForeignKey(() => Category)
    @Column
    category_id: number;

    @BelongsTo(() => Category)
    category: Category;


    @AllowNull(false)
    @Column(DataType.STRING)
    service_name: string;


    @AllowNull(false)
    @Column({ type: DataType.ENUM(...Object.values(Types)) })
    type: string;

    @HasMany(() => ServicePriceMapping)
    prices: ServicePriceMapping[]
}