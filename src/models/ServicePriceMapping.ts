// Model example
import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey } from "sequelize-typescript";
import { Table } from "sequelize-typescript";
import { Service } from "./Service";
import { ServicePrice } from "./ServicePrice";



@Table({
    modelName: 'ServicePriceMapping',
    tableName: 'service_price_mapping',
})
export class ServicePriceMapping extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: 'id' })
    id: number;

    @ForeignKey(() => Service)
    @Column
    service_id: number;

    @BelongsTo(() => Service)
    service: Service;

    @ForeignKey(() => ServicePrice)
    @Column
    price_id: number;

    @BelongsTo(() => ServicePrice)
    price: ServicePrice;

}