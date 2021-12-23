"""empty message

Revision ID: 03cb8614bc51
Revises: b9dd16f28d9f
Create Date: 2021-12-22 15:52:04.197233

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '03cb8614bc51'
down_revision = 'b9dd16f28d9f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('markerss')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('markerss',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.Column('color', sa.VARCHAR(length=7), autoincrement=False, nullable=True),
    sa.Column('lat', sa.NUMERIC(), autoincrement=False, nullable=True),
    sa.Column('lng', sa.NUMERIC(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='markerss_pkey')
    )
    # ### end Alembic commands ###
