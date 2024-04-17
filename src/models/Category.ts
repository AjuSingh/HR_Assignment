// Model example
import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey } from "sequelize-typescript";
import { Table } from "sequelize-typescript";



@Table({
    modelName: 'Category',
    tableName: 'category',
})
export class Category extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: 'id' })
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    category_name: string;
}