import { string } from '@ioc:Adonis/Core/Helpers'
import { SnakeCaseNamingStrategy, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'

// override serialization of fields to use camelCase not snakeCase
class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
  public serializedName(_model: typeof BaseModel, propertyName: string) {
    return string.camelCase(propertyName)
  }
}

BaseModel.namingStrategy = new CamelCaseNamingStrategy()
Database.SimplePaginator.namingStrategy = new CamelCaseNamingStrategy()
