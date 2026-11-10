from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class Input(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class ProductInput(Input):
    name: str = Field(min_length=1, max_length=120)
    price_minor: int = Field(strict=True, ge=0, le=100000000)
    stock: int = Field(strict=True, ge=0, le=1000000)


class ProductPatch(Input):
    name: str = Field(min_length=1, max_length=120)
    price_minor: int = Field(strict=True, ge=0, le=100000000)


class ProductRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    price_minor: int
    stock: int


class CartLine(Input):
    product_id: int = Field(strict=True, gt=0)
    quantity: int = Field(strict=True, ge=1, le=1000)


class OrderInput(Input):
    items: list[CartLine] = Field(min_length=1, max_length=50)
    customer: str = Field(default="", max_length=80)
    address: str = Field(default="", max_length=300)

    @model_validator(mode="after")
    def unique_products(self):
        if len({item.product_id for item in self.items}) != len(self.items):
            raise ValueError("Combine duplicate product IDs into one cart row")
        return self


class ItemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    product_id: int
    quantity: int
    unit_price_minor: int


class OrderRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    status: str
    total_minor: int
    created_at: str
    items: list[ItemRead]
