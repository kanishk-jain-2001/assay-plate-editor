from sqlalchemy.orm import DeclarativeBase
from flask_sqlalchemy import SQLAlchemy

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

# Table 1 Contains all the master data for a Table
class Plates(Base):
    __tablename__ = "plates"

# Table 2 Contains the detailed information for the 96 well plates, foreign key is connected to table 1 

# Table 3 contains the detailed informatino for the 136 well plates, foreign key is connected to table 1

