from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import JSON, ForeignKey 
from sqlalchemy.orm import mapped_column, Mapped, DeclarativeBase, relationship

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

# Table 1 Contains all the master data for a Table
class Plates(Base):
    __tablename__ = "plates_master"
    id: Mapped[int] = mapped_column(primary_key = True)
    type: Mapped[int] = mapped_column(nullable = False)

    # Relationships
    plate96_details = relationship("Plate96", backref="plate", uselist=False)
    plate384_details = relationship("Plate384", backref="plate", uselist=False)

# Table 2 Contains the detailed information for the 96 well plates, foreign key is connected to table 1 
class Plate96(Base):
   __tablename__ = "96_well_plates"
   id: Mapped[int] = mapped_column(primary_key = True)
   plate_id: Mapped[int] = mapped_column(ForeignKey("plates_master.id", ondelete='CASCADE'), nullable = False)
   wells: Mapped[dict] = mapped_column(type_=JSON)

# Table 3 contains the detailed information for the 136 well plates, foreign key is connected to table 1
class Plate384(Base):
   __tablename__ = "384_well_plates"
   id: Mapped[int] = mapped_column(primary_key=True)
   plate_id: Mapped[int] = mapped_column(ForeignKey("plates_master.id", ondelete='CASCADE'), nullable = False)
   wells: Mapped[dict] = mapped_column(type_=JSON)
