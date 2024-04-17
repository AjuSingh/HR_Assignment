// Model example
import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey } from "sequelize-typescript";
import { Table } from "sequelize-typescript";
import { Service } from "./Service";


enum Types {
    Hourly = 'Hourly',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
}


@Table({
    modelName: 'ServicePrice',
    tableName: 'service_price',
})
export class ServicePrice extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: 'id' })
    id: number;

    @ForeignKey(() => Service)
    @Column
    service_id: number;

    @BelongsTo(() => Service)
    service: Service;


    @AllowNull(false)
    @Column(DataType.INTEGER)
    duration: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    price: number;

    
    @AllowNull(false)
    @Column({ type: DataType.ENUM(...Object.values(Types)) })
    type: string;
}