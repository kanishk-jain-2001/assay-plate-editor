from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String
from sqlalchemy.orm import mapped_column, Mapped, DeclarativeBase
from typing import Optional

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

# Table 1 Contains all the master data for a Table
class Plates(Base):
    __tablename__ = "plates"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    fullname: Mapped[str] = mapped_column(String(30))
    nickname: Mapped[Optional[str]]


# Table 2 Contains the detailed information for the 96 well plates, foreign key is connected to table 1 
class Plate96(Base):
   __tablename__ = "96_well_plates"


# Table 3 contains the detailed informatino for the 136 well plates, foreign key is connected to table 1
class Plate384(Base):
   __tablename__ = "384_well_plates"


