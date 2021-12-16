"""empty message

Revision ID: 65c0d77b163c
Revises: a67797152344
Create Date: 2021-12-15 21:17:16.160514

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '65c0d77b163c'
down_revision = 'a67797152344'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('genders', 'type')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('genders', sa.Column('type', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    # ### end Alembic commands ###